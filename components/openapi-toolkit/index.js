import { useQuery, useMutation } from 'react-query'
import { useUser } from 'hooks/use-user'
import { kebabCaseToCamelCase, toTitleCase } from 'util/case'
import { get, post, patch, del } from 'util/api'

import doc from './doc.json'

export const useDjangoList = (url, reactQueryArgs = {}) => {
  const [user] = useUser()
  const reactQuery = useQuery(
    [url],
    () => get(url, { token: user?.token }),
    reactQueryArgs
  )
  return [
    reactQuery.data?.results,
    { ...reactQuery, count: reactQuery.data?.count },
  ]
}

export const useDjangoResource = (url, reactQueryArgs = {}) => {
  const [user] = useUser()
  const reactQuery = useQuery(
    [url],
    () => get(url, { token: user?.token }),
    reactQueryArgs
  )
  return [reactQuery.data, reactQuery]
}

const buildOpenApiUrls = (openApiDoc, toolkit) => {
  const pathToName = (path) => {
    const baseName = kebabCaseToCamelCase(path.replace(/\//g, '-')).replace(
      /(.+)-\{id\}/g,
      '$1Detail'
    )
    return baseName[0].toLowerCase() + baseName.slice(1)
  }

  const pathToJSPath = (path) => path.replace(/(.+)\{(.+)\}/g, '$1:$2')

  const urls = Object.keys(openApiDoc.paths).reduce(
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

const buildOpenApiHttpMethods = (openApiDoc, toolkit) => {
  return {
    http: Object.entries(openApiDoc.paths).reduce((acc, [path, methods]) => ({
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
          }) => {
            if (method === 'get') {
              return get(toolkit.url(name, { args, params: queries }))
            }
            if (method === 'post') {
              return post(toolkit.url(name, { args, params: queries }), data)
            }
            if (method === 'patch') {
              return patch(toolkit.url(name, { args, params: queries }), data)
            }
            if (method === 'delete') {
              return del(toolkit.url(name, { args, params: queries }), data)
            }
          },
        }
      }, {}),
    })),
  }
}

const buildOpenApiQueryHooks = (openApiDoc, toolkit) => {
  const toHookName = (name) => `use${toTitleCase(name)}`
  return {
    queries: Object.entries(openApiDoc.paths).reduce((acc, [path, methods]) => {
      if (!methods.get) return acc
      const name = toolkit.pathToName(path)

      const properties =
        methods.get.responses[200].content['application/json'].schema.properties
      const isList = properties.count && properties.next && properties.resources

      return {
        ...acc,
        [toHookName(name)]: ({ args, query } = {}, reactQueryArgs) =>
          isList
            ? useDjangoList(toolkit.url(name, { args, query }), reactQueryArgs)
            : useDjangoResource(
                toolkit.url(name, { args, query }),
                reactQueryArgs
              ),
      }
      toolkit.url(name)
    }),
  }
}

const buildOpenApiMutationHooks = (openApiDoc, toolkit) => {
  const toHookName = (name, { isEdit, isDelete } = {}) =>
    [
      'use',
      toTitleCase(name),
      ...(isEdit ? ['Edit'] : []),
      ...(isDelete ? ['Delete'] : []),
      'Mutation',
    ].join('')
  return {
    mutations: Object.entries(openApiDoc.paths).reduce(
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
                [toHookName(name)]: ({ args } = {}) =>
                  useMutation((data) => toolkit.http[`${name}Post`]({ data })),
              }),
          ...(!canEdit
            ? {}
            : {
                [toHookName(name, { isEdit: true })]: ({ args } = {}) =>
                  useMutation((data) => toolkit.http[`${name}Patch`]({ data })),
              }),
          ...(!canDelete
            ? {}
            : {
                [toHookName(name, { isDelete: true })]: ({ args } = {}) =>
                  useMutation(() => del(toolkit.url(name, { args }))),
              }),
        }
        toolkit.url(name)
      }
    ),
  }
}

const buildOpenApiToolkit = (openApiDoc) => {
  const serverName = 'Staging server'
  const server = openApiDoc.servers.find(
    ({ description }) => description === serverName
  )

  const toolBuilders = [
    buildOpenApiUrls,
    buildOpenApiHttpMethods,
    buildOpenApiQueryHooks,
    buildOpenApiMutationHooks,
    // buildOpenApiForms,
    // buildOpenApiTables,
    // buildOpenApiPages,
  ]

  return toolBuilders.reduce(
    (acc, toolBuilder) => ({
      ...acc,
      ...toolBuilder(openApiDoc, acc),
    }),
    {
      context: {
        server,
      },
    }
  )
}

const toolkit = buildOpenApiToolkit(doc)

console.log('OpenApiToolkit2', toolkit)

export const OpenAPIToolkit = () => {
  // const path = '/public/user/signup'
  const path = '/user/payment/my-vehicles/{id}'
  const method = 'patch'

  const lots = toolkit.queries.usePublicInfrastructureLots()
  const [lot] = toolkit.queries.usePublicInfrastructureLotsDetail(
    {
      args: { id: 90 },
    },
    { enabled: false }
  )

  const loginMutation = toolkit.mutations.usePublicUserLoginMutation()

  // console.log('yo', lot)

  // const OpenForm = useOpenAPIForm({ path, method })
  // const OpenForm = OpenApiToolkit.forms[path][method]
  // const AutoForm = OpenForm.AutoForm

  // const ParkingLotTable = OpenApiToolkit.tables['/public/infrastructure/lots']
  // const ForgotStep1Form =
  //   OpenApiForms['/public/user/forgot-password-step-1']['post']

  return (
    <div>
      <h1>OpenAPI Toolkit</h1>
      <ul>
        <li>urls ✅</li>
        <li>http methods ✅</li>
        <li>query hooks ✅</li>
        <li>mutation hooks ✅</li>
        <li>forms</li>
        <li>tables</li>
        <li>pagination</li>
        <li>pages</li>
      </ul>
      <button
        onClick={async () => {
          console.log('testing')
          const res = await loginMutation.mutateAsync({
            email: 'hello',
            password: 'there',
          })
          console.log('response', res)
        }}
      >
        Login
      </button>
    </div>
  )
}
