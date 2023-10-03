import { useState, useMemo } from 'react'
import { Loading } from 'components/loading'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { Button } from 'components/admin/button'
import { FormError as BaseFormError } from 'components/admin/form-error'
import { capitalize } from 'util/case'
import { useIsMounted } from 'hooks/use-is-mounted'
import styles from './forms.module.scss'

export const buildOpenApiUseForm = (openapiDoc, toolkit) => ({
  useForm: buildUseForm({ openapiDoc, toolkit }),
})

const buildUseForm = ({ openapiDoc, toolkit }) => {
  const useForm = (
    name,
    method,
    { theme: selectedTheme = 'default', anyTheme = false } = {}
  ) => {
    return useMemo(() => {
      const theme = capitalize(selectedTheme)
      const [path, methods] =
        Object.entries(openapiDoc.paths).find(
          ([path]) => toolkit.strings.pathToName(path) === name
        ) || []
      if (!path) {
        console.warn('No endpoint named', name)
        return
      }
      const endpoint = methods[method]
      if (!endpoint) {
        console.warn('No endpoint named', name, 'with method', method)
        return
      }
      const allFields = buildFields({ endpoint, toolkit })
      const defaultFields = Object.fromEntries(
        Object.entries(allFields)
          .map(([name, components]) => {
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
          .filter(Boolean)
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
        onSuccess,
        onSubmit,
        submitText = 'Submit',
      }) => {
        useInitialData = useInitialData
          ? useInitialData
          : method === 'patch'
          ? () =>
              toolkit.queries[toolkit.strings.pathToQueryHook(path)]({
                args: { id: resourceId },
              })
          : () => [{}, {}]
        return (
          <Form
            className={className || styles.autoform}
            resourceId={resourceId}
            useInitialData={useInitialData}
            onSubmit={onSubmit}
            onSuccess={onSuccess}
          >
            <FormError />
            {children}
            {!children &&
              flattenFields(defaultFields, `${name}.${method}.${resourceId}`)}
            {!children && <SubmitButton>{submitText}</SubmitButton>}
          </Form>
        )
      }
      return {
        Fields: defaultFields,
        Form: AutoForm,
        SubmitButton,
        AllFields: allFields,
      }
    }, [name, method, selectedTheme, anyTheme])
  }
  return useForm
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

const flattenFields = (fields, id) =>
  Object.entries(fields).flatMap(([name, Field]) =>
    typeof Field === 'function' ? <Field key={name} /> : flattenFields(Field)
  )

const buildFormComponent = ({ path, method, toolkit }) => {
  const Form = ({
    initialData,
    resourceId,
    children,
    onSubmit: customOnSubmit,
    onSuccess: customOnSuccess,
    ...props
  }) => {
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

    const onSuccess = () => {
      setMetaData((curr) => ({ ...curr, success: true }))
      setTimeout(() => {
        if (isMounted.current) {
          setMetaData((curr) => ({ ...curr, success: false }))
        }
      }, 2000)
    }

    const onSubmit =
      customOnSubmit ||
      (async (data) => {
        // TODO: add naming utils to toolkit
        const response = await mutation.mutateAsync(data)
        await customOnSuccess?.(response)
      })

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
            methods.handleSubmit(onSubmit)(ev)
            onSuccess()
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

const getFieldComponentsForField = (name, details, toolkit) => {
  return toolkit.context?.form?.fields?.reduce((acc, field) => {
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
  const schema = requestBody.schema

  const fieldsFromSchema = (schema, toolkit, prefixes = []) => {
    return Object.entries(schema.properties).reduce((acc, [name, details]) => {
      if (details.type === 'object') {
        return {
          ...acc,
          ...fieldsFromSchema(details, toolkit, [...prefixes, name]),
        }
      } else {
        acc[prefixes.map(capitalize).join('') + capitalize(name)] =
          getFieldComponentsForField(
            [...prefixes, name].join('.'),
            details,
            toolkit
          )
      }
      return acc
    }, {})
  }

  return fieldsFromSchema(schema, toolkit)
}
