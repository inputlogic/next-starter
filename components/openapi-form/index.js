import { post } from 'util/api'
import doc from './doc.json'

const getField = (name) => {}

const buildOpenAPIForms = (openApiDoc) => {
  const path = '/public/user/signup'
  const method = 'post'
  const serverName = 'Local django server'
  const server = openApiDoc.servers.find(
    ({ description }) => description === serverName
  )
  const endpoint = openApiDoc.paths[path][method]
  const requestBody = endpoint.requestBody.content['application/json']
  const schema = requestBody.schema.properties
  const examples = requestBody.examples
  const fields = Object.entries(schema).reduce(
    (acc, [name, details]) => ({
      ...acc,
      [name]: ({}) => (
        <label key={name}>
          {name}
          <input />
        </label>
      ),
    }),
    {}
  )

  const Form = (props) => (
    <form
      onSubmit={async () => {
        const data = {}
        const response = await post(`${server.url}/${path}`, data)
        console.log('yooo', response)
      }}
      {...props}
    />
  )

  return {
    [path]: {
      [method]: {
        fields,
        Form,
        Autoform: () => (
          <Form>
            {Object.entries(fields).map(([name, Field]) => (
              <Field key={name} />
            ))}
            <button>Submit</button>
          </Form>
        ),
      },
    },
  }
}

const openApiForms = buildOpenAPIForms(doc)

export const OpenAPIForm = () => {
  const path = '/public/user/signup'
  const method = 'post'
  // const OpenForm = useOpenAPIForm({ path, method })
  const OpenForm = openApiForms[path][method]
  const Autoform = OpenForm.Autoform

  return (
    <div>
      <h1>OpenAPI Form</h1>
      <OpenForm.Autoform />
    </div>
  )
}
