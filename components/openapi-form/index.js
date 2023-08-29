import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { useQuery } from 'react-query'
import { post, get, patch } from 'util/api'
import { kebabCaseToCamelCase } from 'util/case'

import styles from './style.module.scss'
import doc from './doc.json'

const buildOpenApiUrls = (openApiDoc) => {
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

  const url = (name, { args, query }) => {
    // let u = settings.apiUrl + apiUrls[pathName]
    let u = urls[name]
    for (const [k, v] of Object.entries(args)) {
      u = u.replace(`:${k}`, v)
    }
    return query ? `${u}?${new URLSearchParams(query).toString()}` : u
  }

  return {
    urls,
    url,
  }
}

const buildOpenApiTable = ({ path, endpoint, server }) => {
  const Table = ({ customHeading, customCell }) => {
    const { data } = useQuery([endpoint.description, server], () =>
      get(`${server.url}${path}`)
    )
    const resourceSchema =
      endpoint.responses[200].content['application/json'].schema.properties
        .resources.items.properties
    const keys = Object.keys(resourceSchema)
    if (!data) return 'loading table...'
    return (
      <>
        <table className={styles.table}>
          <thead>
            <tr>
              {keys.map((key) => (
                <th key={key}>{customHeading?.[key] || key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.results.map((result) => (
              <tr key={result.id}>
                {keys.map((key) => {
                  const render = customCell?.[key] || ((value) => value)
                  return (
                    <td key={`${result.id}-${key}`}>{render(result[key])}</td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div>todo: add pagination</div>
      </>
    )
  }
  return {
    Table,
  }
}

const buildOpenApiForm = ({ path, endpoint, server }) => {
  const requestBody = endpoint.requestBody.content['application/json']
  const schema = requestBody.schema.properties
  const examples = requestBody.examples
  const fields = Object.entries(schema).reduce(
    (acc, [name, details]) => ({
      ...acc,
      [name]: ({}) => {
        const { register } = useFormContext() // retrieve all hook methods
        return (
          <label key={name}>
            {name}
            <input
              type={['password', 'email'].includes(name) ? name : 'text'}
              {...register(name)}
            />
          </label>
        )
      },
    }),
    {}
  )

  const EditForm = (props) => {
    const methods = useForm()
    const existing = useQuery([], () => {
      console.log('TODO')
    })
    const onSubmit = async (data) => {
      const response = await patch(`${server.url}${path}`, data)
    }

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} {...props} />
      </FormProvider>
    )
  }

  const Form = (props) => {
    const methods = useForm()

    const onSubmit = async (data) => {
      const response = await post(`${server.url}${path}`, data)
    }

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} {...props} />
      </FormProvider>
    )
  }

  return {
    fields,
    Form,
    AutoForm: () => (
      <Form>
        {Object.entries(fields).map(([name, Field]) => (
          <Field key={name} />
        ))}
        <button>Submit</button>
      </Form>
    ),
  }
}

const buildOpenApiToolkit = (openApiDoc) => {
  const serverName = 'Staging server'
  const server = openApiDoc.servers.find(
    ({ description }) => description === serverName
  )

  return {
    ...buildOpenApiUrls(openApiDoc),
    forms: Object.entries(openApiDoc.paths).reduce(
      (acc, [path, methods]) => ({
        ...acc,
        [path]: Object.entries(methods).reduce(
          (acc, [method, endpoint]) => ({
            ...acc,
            ...(!['post', 'patch'].includes(method)
              ? {}
              : {
                  [method]: buildOpenApiForm({
                    path,
                    method,
                    endpoint,
                    server,
                  }),
                }),
          }),
          {}
        ),
      }),
      {}
    ),
    tables: Object.entries(openApiDoc.paths).reduce(
      (acc, [path, methods]) => ({
        ...acc,
        ...(!methods.get || path.endsWith('{id}')
          ? {}
          : {
              [path]: buildOpenApiTable({
                path,
                endpoint: methods.get,
                server,
              }),
            }),
      }),
      {}
    ),
  }
}

const OpenApiToolkit = buildOpenApiToolkit(doc)

console.log('OpenAPIDoc', doc)
console.log('OpenApiToolkit', OpenApiToolkit)

export const OpenAPIForm = () => {
  // const path = '/public/user/signup'
  const path = '/user/payment/my-vehicles/{id}'
  const method = 'patch'
  // const OpenForm = useOpenAPIForm({ path, method })
  const OpenForm = OpenApiToolkit.forms[path][method]
  const AutoForm = OpenForm.AutoForm

  const ParkingLotTable = OpenApiToolkit.tables['/public/infrastructure/lots']
  // const ForgotStep1Form =
  //   OpenApiForms['/public/user/forgot-password-step-1']['post']

  return (
    <div>
      <h1>OpenAPI Form</h1>
      {/* <h2>Signup Form</h2> */}
      <AutoForm />
      <br />
      <br />

      <ParkingLotTable.Table
        customHeading={{
          baseMapImage: 'Custom Base Map Heading',
        }}
        customCell={{
          baseMapImage: (url) => <img width={80} height={80} src={url} />,
        }}
      />

      {/* <h2>Forgot Password Form</h2> */}
      {/* <ForgotStep1Form.AutoForm /> */}

      {/* <br /> */}
      {/* <h2>Forgot Password Form Manual</h2> */}
      {/* <ForgotStep1Form.Form> */}
      {/*   <ForgotStep1Form.fields.email /> */}
      {/* </ForgotStep1Form.Form> */}
    </div>
  )
}
