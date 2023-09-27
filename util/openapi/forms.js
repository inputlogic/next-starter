import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { FormHelper } from './form-helper'

export const buildOpenApiForms = (openapiDoc, toolkit) => ({
  forms: Object.entries(openapiDoc.paths).reduce(
    (acc, [path, methods]) => ({
      ...acc,
      [toolkit.strings.pathToName(path)]: Object.entries(methods).reduce(
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

const flattenFields = (fields) =>
  Object.entries(fields).flatMap(([name, Field]) =>
    typeof Field === 'function' ? <Field key={name} /> : flattenFields(Field)
  )

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
          toolkit.queries[toolkit.strings.pathToQueryHook(path)]({
            args: { id },
          })[0]
      : () => ({})
    return (
      <Form id={id} useInitialData={useInitialData}>
        {flattenFields(fields)}
        {/* {Object.entries(fields).map(([name, Field]) => ( */}
        {/*   <Field key={name} /> */}
        {/* ))} */}
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
    const useMutation =
      toolkit.mutations[
        toolkit.strings.pathAndMethodToMutationHook(path, method)
      ]
    const mutation = useMutation({ setError: methods.setError, args: { id } })

    const onSubmit = async (data) => {
      // TODO: add naming utils to toolkit
      const response = await mutation.mutateAsync(data)
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
    console.log('initialData', initialData)
    return <Form initialData={initialData} {...props} />
  }
  return FormWithInitialData
}

const defaultField =
  ({ name }) =>
  () => {
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
          {errors[name] && <div>{errors[name]?.message}</div>}
        </label>
      </fieldset>
    )
  }

const getField = (name, details) => {
  // TODO: handle custom field types
  if (details.type === 'object') {
    if (!details.properties) {
      console.warn('TODO: handle empty json object field')
    }
    return Object.entries(details.properties || {}).reduce(
      (acc, [nestedName, nestedDetails]) => ({
        ...acc,
        [nestedName]: getField(nestedName, nestedDetails),
      }),
      {}
    )
  }
  if (details.type === 'boolean') {
    return () => {
      const {
        register,
        formState: { errors },
      } = useFormContext() // retrieve all hook methods
      return (
        <fieldset>
          <label>
            {name}:
            <input type="checkbox" name={name} {...register(name)} />
          </label>
        </fieldset>
      )
    }
  }
  return defaultField({ name })
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
  return Object.entries(schema).reduce((acc, [name, details]) => {
    const field = getField(name, details)
    return {
      ...acc,
      [name]: field,
    }
  }, {})
}
