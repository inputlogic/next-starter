import { useMutation } from 'react-query'
import { useUser } from 'hooks/use-user'
import { kebabCaseToCamelCase, toTitleCase } from 'util/case'
import { get, post, patch, del } from 'util/api'
import { errorHandler } from 'util/drf/error-handler'
import { useDjangoList, useDjangoResource } from 'util/drf/hooks'
import { buildOpenApiForms } from './forms'

import doc from './openapi-doc.json'

const buildOpenApiUrls = (openapiDoc, toolkit) => {
  const pathToName = (path) => {
    const baseName = kebabCaseToCamelCase(path.replace(/\//g, '-')).replace(
      /(.+)-\{id\}/g,
      '$1Detail'
    )
    return baseName[0].toLowerCase() + baseName.slice(1)
  }

  const pathToJSPath = (path) => path.replace(/(.+)\{(.+)\}/g, '$1:$2')

  const urls = Object.keys(openapiDoc.paths).reduce(
    (acc, path) => ({
      ...acc,
      [pathToName(path)]: pathToJSPath(path),
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
    pathToName,
  }
}

const buildOpenApiHttpMethods = (openapiDoc, toolkit) => {
  return {
    http: Object.entries(openapiDoc.paths).reduce((acc, [path, methods]) => ({
      ...acc,
      ...Object.keys(methods).reduce((acc, method) => {
        const name = toolkit.pathToName(path)
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
      const name = toolkit.pathToName(path)

      const properties =
        methods.get.responses[200].content['application/json'].schema.properties
      const isList = properties.count && properties.next && properties.resources

      return {
        ...acc,
        [toHookName(name)]: ({ args, query } = {}, reactQueryArgs) => {
          const url = toolkit.url(name, { args, query })
          return isList
            ? useDjangoList(url, reactQueryArgs)
            : useDjangoResource(url, reactQueryArgs)
        },
      }
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
        const name = toolkit.pathToName(path)
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
                            onError: drfErrorHandler(setError),
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
                            onError: drfErrorHandler(setError),
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

const buildOpenApiToolkit = (openapiDoc) => {
  const server = {
    url: process.env.NEXT_PUBLIC_API_URL,
  }

  const toolBuilders = [
    buildOpenApiUrls,
    buildOpenApiHttpMethods,
    buildOpenApiQueryHooks,
    buildOpenApiMutationHooks,
    buildOpenApiForms,
    // buildOpenApiTables,
  ]

  return toolBuilders.reduce(
    (acc, toolBuilder) => ({
      ...acc,
      ...toolBuilder(openapiDoc, acc),
    }),
    {
      context: {
        server,
      },
    }
  )
}

/**
 * This openapi object has a bunch of helpful network tools
 * Do a global search of openapi to see examples.
 * It can also be useful to console.log this to see
 * everything that is available.
 * - url builder
 * - http methods
 * - react-query hooks and mutations
 */
export const openapi = buildOpenApiToolkit(doc)
