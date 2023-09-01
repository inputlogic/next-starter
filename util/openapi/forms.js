import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { capitalize } from 'util/case'
import { FormHelper } from './form-helper'

export const buildOpenApiForms = (openapiDoc, toolkit) => ({
  forms: Object.entries(openapiDoc.paths).reduce(
    (acc, [path, methods]) => ({
      ...acc,
      [toolkit.pathToName(path)]: Object.entries(methods).reduce(
        (acc, [method, endpoint]) => ({
          ...acc,
          ...(!['post', 'patch'].includes(method)
            ? {}
            : {
                [method]: buildOpenApiForm({
                  path,
                  method,
                  endpoint,
                  toolkit,
                  openapiDoc,
                }),
              }),
        }),
        {}
      ),
    }),
    {}
  ),
})

export const buildOpenApiForm = ({
  path,
  method,
  endpoint,
  toolkit,
  openapiDoc,
}) => {
  const fields = buildOpenApiFields({
    path,
    method,
    endpoint,
    toolkit,
    openapiDoc,
  })
  const Form = buildFormComponent({
    path,
    method,
    endpoint,
    toolkit,
    openapiDoc,
  })
  const AutoForm = ({ useInitialData, id, ...props }) => {
    useInitialData = useInitialData
      ? useInitialData
      : method === 'patch'
      ? () =>
          toolkit.queries[`use${capitalize(toolkit.pathToName(path))}`]({
            args: { id },
          })[0]
      : () => ({})
    return (
      <Form id={id} useInitialData={useInitialData}>
        {Object.entries(fields).map(([name, Field]) => (
          <Field key={name} />
        ))}
        <button>Submit</button>
      </Form>
    )
  }
  return {
    fields,
    Form,
    AutoForm,
  }
}

const buildFormComponent = ({
  path,
  method,
  endpoint,
  toolkit,
  openapiDoc,
}) => {
  const Form = ({ initialData, id, children, ...props }) => {
    const methods = useForm({ defaultValues: initialData })

    console.log(
      'mutation name',
      method,
      `use${capitalize(toolkit.pathToName(path))}${
        method === 'patch' ? 'Edit' : ''
      }Mutation`
    )
    const useMutation =
      toolkit.mutations[
        `use${capitalize(toolkit.pathToName(path))}${
          method === 'patch' ? 'Edit' : ''
        }Mutation`
      ]
    const mutation = useMutation({ setError: methods.setError, args: { id } })

    const onSubmit = async (data) => {
      // TODO: add naming utils to toolkit
      // const httpMethod =
      //   toolkit.http[`${toolkit.pathToName(path)}${toTitleCase(method)}`]
      // const response = await post(`${server.url}${path}`, data)
      // console.log('TODO SUBMIT', data)
      const response = await mutation.mutateAsync(data)
      console.log('response!', response)
    }

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
          <FormHelper
            reset={methods.reset}
            example={
              endpoint.requestBody.content['application/json'].examples.example1
                .value
            }
          />
          {children}
        </form>
      </FormProvider>
    )
  }
  const FormWithInitialData = ({ useInitialData = () => ({}), ...props }) => {
    const initialData = useInitialData()
    if (!initialData) return 'Loading...'
    return <Form initialData={initialData} {...props} />
  }
  return FormWithInitialData
}

const buildOpenApiFields = ({
  path,
  method,
  endpoint,
  toolkit,
  openapiDoc,
}) => {
  const requestBody = endpoint.requestBody.content['application/json']
  const schema = requestBody.schema.properties
  const examples = requestBody.examples
  return Object.entries(schema).reduce(
    (acc, [name, details]) => ({
      ...acc,
      [name]: ({}) => {
        const {
          register,
          formState: { errors },
        } = useFormContext() // retrieve all hook methods
        return (
          <fieldset>
            <label key={name}>
              {name}
              <input
                type={['password', 'email'].includes(name) ? name : 'text'}
                {...register(name)}
              />
              {errors[name] && <div>{errors[name]}</div>}
            </label>
          </fieldset>
        )
      },
    }),
    {}
  )
}
