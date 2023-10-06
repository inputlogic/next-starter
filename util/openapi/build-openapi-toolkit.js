import { useMutation, useQuery } from 'react-query'
import { useUser } from 'hooks/use-user'
import { kebabCaseToCamelCase, toTitleCase } from 'util/case'
import { get, post, patch, del } from 'util/api'
import { errorHandler } from 'util/drf/error-handler'
import { buildOpenApiForms } from './forms'
import { buildOpenApiUseForm } from './use-form'
import { buildOpenApiTables } from './tables'

import doc from './openapi-doc.json'

const buildOpenApiStrings = () => {
  const pathToName = (path) => {
    const baseName = kebabCaseToCamelCase(path.replace(/\//g, '-')).replace(
      /(.+)-\{id\}/g,
      '$1Detail'
    )
    return baseName[0].toLowerCase() + baseName.slice(1)
  }

  const pathToJSPath = (path) => path.replace(/(.+)\{(.+)\}/g, '$1:$2')

  const pathAndMethodToHttp = (path, method) =>
    `${pathToName(path)}${toTitleCase(method)}`

  const pathToQueryHook = (path) => `use${toTitleCase(pathToName(path))}`

  const pathAndMethodToMutationHook = (path, method) => {
    const isEdit = method.toLowerCase() === 'patch'
    const isDelete = method.toLowerCase() === 'delete'
    return [
      'use',
      toTitleCase(pathToName(path)),
      ...(isEdit ? ['Edit'] : []),
      ...(isDelete ? ['Delete'] : []),
      'Mutation',
    ].join('')
  }

  return {
    strings: {
      pathToName,
      pathToJSPath,
      pathAndMethodToHttp,
      pathToQueryHook,
      pathAndMethodToMutationHook,
    },
  }
}

const buildOpenApiUrls = (openapiDoc, toolkit) => {
  const urls = Object.keys(openapiDoc.paths).reduce(
    (acc, path) => ({
      ...acc,
      [toolkit.strings.pathToName(path)]: toolkit.strings.pathToJSPath(path),
    }),
    {}
  )

  const url = (name, { args = {}, query }) => {
    // let u = settings.apiUrl + apiUrls[pathName]
    let u = urls[name]
    for (const [k, v] of Object.entries(args)) {
      u = u.replace(`:${k}`, v)
    }
    const fullPath = query ? `${u}?${new URLSearchParams(query).toString()}` : u
    return `${toolkit.context.server.url}${fullPath}`
  }

  return {
    urls,
    url,
  }
}

const buildOpenApiHttpMethods = (openapiDoc, toolkit) => {
  return {
    http: Object.entries(openapiDoc.paths).reduce((acc, [path, methods]) => ({
      ...acc,
      ...Object.keys(methods).reduce((acc, method) => {
        const name = toolkit.strings.pathToName(path)
        if (!['get', 'post', 'patch', 'delete'].includes(method)) {
          return acc
        }
        return {
          ...acc,
          [`${name}${toTitleCase(method)}`]: async ({
            args,
            queries,
            data,
            token,
          }) => {
            if (method === 'get') {
              return get(toolkit.url(name, { args, params: queries }), {
                token,
              })
            }
            if (method === 'post') {
              return post(toolkit.url(name, { args, params: queries }), data, {
                token,
              })
            }
            if (method === 'patch') {
              return patch(toolkit.url(name, { args, params: queries }), data, {
                token,
              })
            }
            if (method === 'delete') {
              return del(toolkit.url(name, { args, params: queries }), data, {
                token,
              })
            }
          },
        }
      }, {}),
    })),
  }
}

const buildOpenApiQueryHooks = (openapiDoc, toolkit) => {
  const toHookName = (name) => `use${toTitleCase(name)}`
  return {
    queries: Object.entries(openapiDoc.paths).reduce((acc, [path, methods]) => {
      if (!methods.get) return acc
      const name = toolkit.strings.pathToName(path)

      const properties =
        methods.get.responses[200].content['application/json'].schema.properties
      const isList = properties.count && properties.next && properties.resources

      return {
        ...acc,
        [toHookName(name)]: isList
          ? ({ args = {}, query = {} } = {}, reactQueryArgs) => {
              const [user] = useUser()
              const reactQuery = useQuery(
                [
                  name,
                  ...Object.entries(args).flatMap((x) => x),
                  ...Object.entries(query).flatMap((x) => x),
                ],
                () =>
                  get(toolkit.url(name, { args, query }), {
                    token: user?.token,
                  }),
                reactQueryArgs
              )
              return [
                reactQuery.data?.results,
                { ...reactQuery, count: reactQuery.data?.count },
              ]
            }
          : ({ args = {}, query = {} } = {}, reactQueryArgs) => {
              const [user] = useUser()
              const reactQuery = useQuery(
                [
                  name,
                  ...Object.entries(args).flatMap((x) => x),
                  ...Object.entries(query).flatMap((x) => x),
                ],
                () =>
                  get(toolkit.url(name, { args, query }), {
                    token: user?.token,
                  }),
                reactQueryArgs
              )
              return [reactQuery.data, reactQuery]
            },
        ...(!isList
          ? {}
          : {
              [`${toHookName(name)}Infinite`]: (
                { args = {}, query: { limit = 25, ...query } = {} },
                reactQueryArgs
              ) => {
                const [user] = useUser()
                const reactQuery = useInfiniteQuery(
                  [
                    name,
                    ...Object.entries(args).flatMap((x) => x),
                    ...Object.entries(query).flatMap((x) => x),
                    'infinite',
                  ],
                  async ({ pageParam = 0 }) => {
                    const result = await get(
                      toolkit.url(name, {
                        args,
                        query: {
                          ...query,
                          limit,
                          offset: pageParam * limit,
                        },
                      }),
                      { token: user?.token }
                    )
                    return { result, pageParam }
                  },
                  {
                    ...reactQueryArgs,
                    getNextPageParam: ({ pageParam, result }) => pageParam + 1,
                    getPreviousPageParam: ({ pageParam, result }) =>
                      pageParam === 0 ? undefined : pageParam - 1,
                  }
                )
                return [
                  reactQuery.data?.pages?.flatMap(
                    (page) => page.result.results
                  ),
                  {
                    ...reactQuery,
                    count: reactQuery.data?.pages?.[0]?.result?.count,
                  },
                ]
              },
            }),
      }

      // return {
      //   ...acc,
      //   [toHookName(name)]: ({ args, query } = {}, reactQueryArgs) => {
      //     const url = toolkit.url(name, { args, query })
      //     return isList
      //       ? useDjangoList(url, reactQueryArgs)
      //       : useDjangoResource(url, reactQueryArgs)
      //   },
      // }
    }, {}),
  }
}

const buildOpenApiMutationHooks = (openapiDoc, toolkit) => {
  const toHookName = (name, { isEdit, isDelete } = {}) =>
    [
      'use',
      toTitleCase(name),
      ...(isEdit ? ['Edit'] : []),
      ...(isDelete ? ['Delete'] : []),
      'Mutation',
    ].join('')
  return {
    mutations: Object.entries(openapiDoc.paths).reduce(
      (acc, [path, methods]) => {
        const name = toolkit.strings.pathToName(path)
        const canCreate = methods.post
        const canEdit = methods.patch
        const canDelete = methods.delete

        return {
          ...acc,
          ...(!canCreate
            ? {}
            : {
                [toHookName(name)]: ({ args, setError, ...rest } = {}) => {
                  const [user] = useUser()
                  return useMutation(
                    (data) =>
                      toolkit.http[`${name}Post`]({
                        data,
                        args,
                        token: user?.token,
                      }),
                    {
                      ...(!setError
                        ? {}
                        : {
                            onError: errorHandler(setError),
                          }),
                      ...rest,
                    }
                  )
                },
              }),
          ...(!canEdit
            ? {}
            : {
                [toHookName(name, { isEdit: true })]: ({
                  args,
                  setError,
                  ...rest
                } = {}) => {
                  const [user] = useUser()
                  return useMutation(
                    (data) =>
                      toolkit.http[`${name}Patch`]({
                        data,
                        args,
                        token: user?.token,
                      }),
                    {
                      ...(!setError
                        ? {}
                        : {
                            onError: errorHandler(setError),
                          }),
                      ...rest,
                    }
                  )
                },
              }),
          ...(!canDelete
            ? {}
            : {
                [toHookName(name, { isDelete: true })]: ({
                  args,
                  setError,
                  ...rest
                } = {}) => {
                  const [user] = useUser()
                  return useMutation(
                    () =>
                      del(toolkit.url(name, { args }), { token: user?.token }),
                    {
                      ...(!setError
                        ? {}
                        : {
                            onError: errorHandler(setError),
                          }),
                      ...rest,
                    }
                  )
                },
              }),
        }
      },
      {}
    ),
  }
}

export const buildOpenApiToolkit = (openapiDoc, context) => {
  const toolBuilders = [
    buildOpenApiStrings,
    buildOpenApiUrls,
    buildOpenApiHttpMethods,
    buildOpenApiQueryHooks,
    buildOpenApiMutationHooks,
    buildOpenApiForms,
    buildOpenApiUseForm,
    buildOpenApiTables,
  ]

  return toolBuilders.reduce(
    (acc, toolBuilder) => ({
      ...acc,
      ...toolBuilder(openapiDoc, acc),
    }),
    {
      doc,
      context,
    }
  )
}
