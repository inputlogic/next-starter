import { useRef, useState, useEffect, useMemo } from 'react'
import { Loading } from 'components/loading'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { Input } from 'components/admin/input'
import { Label } from 'components/admin/label'
import { Field } from 'components/admin/field'
import { Button } from 'components/admin/button'
import { FieldError } from 'components/admin/field-error'
import { FormError as BaseFormError } from 'components/admin/form-error'
import { toTitleCase, capitalize } from 'util/case'
import styles from './forms.module.scss'

const useIsMounted = () => {
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

const FormError = (props) => {
  const form = useFormContext() // retrieve all hook methods
  if (Object.keys(form.formState.errors).length) {
    return (
      <BaseFormError error={form.formState.errors.root?.raw?.message}>
        {form.formState.errors.root?.message?.message}
      </BaseFormError>
    )
  }
}

const SubmitButton = (props) => {
  const form = useFormContext() // retrieve all hook methods
  return (
    <Button
      disabled={form.formState.isSubmitting || form.metaData.success}
      isLoading={form.formState.isSubmitting}
      isSuccess={form.metaData.success}
      {...props}
    />
  )
}

const buildUseForm = ({ openapiDoc, toolkit }) => {
  const useForm = (
    name,
    method,
    { theme = 'default', anyTheme = false, options } = {}
  ) => {
    return useMemo(() => {
      theme = capitalize(theme)
      const [path, methods] =
        Object.entries(openapiDoc.paths).find(
          ([path]) => toolkit.strings.pathToName(path) === name
        ) || []
      if (!path) {
        console.warn('No endpoint named', name)
        return
      }
      const endpoint = methods[method]
      // const [_method, endpoint] =
      //   Object.entries(methods).find(([method]) => method === method) || []
      // console.log('hiiiiiii', method, methods, _method, endpoint)
      if (!endpoint) {
        console.warn('No endpoint named', name, 'with method', method)
        return
      }
      const allFields = buildFields({ endpoint, toolkit })
      const defaultFields = Object.fromEntries(
        Object.entries(allFields).map(([name, components]) => {
          const orderedByPriority = Object.entries(components).sort(
            ([name1, component1], [name2, component2]) =>
              component1.priority > component2.priority ? -1 : 1
          )
          const topPriorityWithTheme = orderedByPriority.filter(([name]) =>
            name.startsWith(theme)
          )[0]
          const topPriorityIgnoreTheme = orderedByPriority[0]
          if (!topPriorityIgnoreTheme) {
            console.warn(
              'Field',
              name,
              'does not have a matching field component. Please provide one.'
            )
            return
          }
          if (!topPriorityWithTheme && !anyTheme) {
            console.warn(
              'Field',
              name,
              'does not have a component for theme',
              theme,
              '. Either provide one, change the theme, or try setting anyTheme to `true` to fall back to a component based on a different theme'
            )
            return
          }
          return [name, topPriorityWithTheme[1] || topPriorityIgnoreTheme[1]]
        })
      )
      const Form = buildFormComponent({
        path,
        method,
        endpoint,
        toolkit,
        openapiDoc,
      })
      const AutoForm = ({
        useInitialData,
        className,
        resourceId,
        children,
        ...props
      }) => {
        useInitialData = useInitialData
          ? useInitialData
          : method === 'patch'
          ? () =>
              toolkit.queries[toolkit.strings.pathToQueryHook(path)]({
                args: { id: resourceId },
              })
          : () => [{}]
        return (
          <Form
            className={className || styles.autoform}
            resourceId={resourceId}
            useInitialData={useInitialData}
          >
            <FormError />
            {children}
            {!children &&
              flattenFields(defaultFields, `${name}.${method}.${resourceId}`)}
            {!children && <SubmitButton>Submit</SubmitButton>}
          </Form>
        )
      }
      return {
        Fields: defaultFields,
        Form,
        AutoForm,
        SubmitButton,
        AllFields: allFields,
      }
    }, [name, method, theme])
  }
  return useForm
}

export const buildOpenApiForms = (openapiDoc, toolkit) => ({
  // useForm: buildUseForm({ openapiDoc, toolkit }),
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

const flattenFields = (fields, id) =>
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
  const fields2 = buildFields({ endpoint, toolkit })
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
  const AutoForm = ({ useInitialData, id = 'form', ...props }) => {
    useInitialData = useInitialData
      ? useInitialData
      : method === 'patch'
      ? () =>
          toolkit.queries[toolkit.strings.pathToQueryHook(path)]({
            args: { id },
          })
      : () => [{}]
    return (
      <Form className={styles.autoform} id={id} useInitialData={useInitialData}>
        <FormError />
        {flattenFields(fields, id)}
        {/* {Object.entries(fields).map(([name, Field]) => ( */}
        {/*   <Field key={name} /> */}
        {/* ))} */}
        <SubmitButton>Submit</SubmitButton>
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
  const Form = ({ initialData, resourceId, children, ...props }) => {
    const name = `${toolkit.strings.pathToName(path)}.${method}`
    const methods = useForm({ defaultValues: initialData })
    const [metaData, setMetaData] = useState({})
    const useMutation =
      toolkit.mutations[
        toolkit.strings.pathAndMethodToMutationHook(path, method)
      ]
    const mutation = useMutation({
      setError: methods.setError,
      args: { id: resourceId },
    })

    const isMounted = useIsMounted()

    const onSubmit = async (data) => {
      // TODO: add naming utils to toolkit
      const response = await mutation.mutateAsync(data)
      setMetaData((curr) => ({ ...curr, success: true }))
      setTimeout(() => {
        if (isMounted.current) {
          setMetaData((curr) => ({ ...curr, success: false }))
        }
      }, 2000)
    }

    return (
      <FormProvider
        {...methods}
        setMetaData={setMetaData}
        name={name}
        metaData={metaData}
      >
        <form
          onSubmit={(ev) => {
            methods.clearErrors('root')
            return methods.handleSubmit(onSubmit)(ev)
          }}
          {...props}
        >
          {/* <FormHelper */}
          {/*   reset={methods.reset} */}
          {/*   example={ */}
          {/*     endpoint.requestBody.content['application/json'].examples.example1 */}
          {/*       .value */}
          {/*   } */}
          {/* /> */}
          {children}
        </form>
      </FormProvider>
    )
  }
  const FormWithInitialData = ({
    useInitialData = () => [{}, {}],
    ...props
  }) => {
    const [initialData, { error }] = useInitialData()
    if (error) {
      return 'TODO: Form loading error'
    }
    if (!initialData) return <Loading />
    return <Form initialData={initialData} {...props} />
  }
  return FormWithInitialData
}

const defaultField =
  ({ name }) =>
  ({ id }) => {
    const {
      register,
      formState: { errors },
    } = useFormContext() // retrieve all hook methods
    return (
      <Field>
        <Label htmlFor={id}>{toTitleCase(name)}</Label>
        <Input
          id={id}
          type={['password', 'email'].includes(name) ? name : 'text'}
          {...register(name)}
        />
        {errors[name] && <FieldError>{errors[name]?.message}</FieldError>}
      </Field>
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
    return ({ id }) => {
      const {
        register,
        formState: { errors },
      } = useFormContext() // retrieve all hook methods
      return (
        <fieldset>
          <input type="checkbox" name={name} id={id} {...register(name)} />
          <Label htmlFor={id}>{name}</Label>
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

const getFieldComponentsForField = (name, details, fields) => {
  return fields?.reduce((acc, field) => {
    if (field.predicate(name, details)) {
      const component = field.component(name, details)
      const theme = field.theme ? capitalize(field.theme) : 'Default'
      component.priority = field.priority
      acc[`${theme}${field.name}`] = component
    }
    return acc
  }, {})
}

const buildFields = ({ endpoint, toolkit }) => {
  const requestBody = endpoint.requestBody.content['application/json']
  const schema = requestBody.schema.properties
  return Object.entries(schema).reduce((acc, [name, details]) => {
    acc[capitalize(name)] = getFieldComponentsForField(
      name,
      details,
      toolkit.context?.form?.fields
    )
    return acc
  }, {})
}
