import { useForm, FormProvider } from 'react-hook-form'
import { useState } from 'react'

// const inputs = [
//   {
//     name: 'email',
//     type: 'email',
//     label: 'Email',
//     hint: 'this is an email',
//     placeholder: 'eg. John@example.com',
//     component:
//   }
// ]

const timeout = (time) => new Promise((res) => setTimeout(() => res(), time))

export const AutoForm = ({ inputs, defaultValues, getComponent, onSubmit }) => {
  const methods = useForm({
    defaultValues,
  })
  const { handleSubmit, register, formState, setError } = methods
  const { isSubmitting, errors } = formState
  const [formError, setFormError] = useState()
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(async (data) => {
          // TODO: validations
          setFormError(null)
          try {
            await timeout(2000)
            await onSubmit(data)
          } catch (err) {
            console.error('AutoForm caught error', err)
            if (err.name === 'formError') {
              setFormError(err.formError)
              setError('root.formError', {
                type: 'custom',
                message: err.formError,
              })
              Object.keys(err.fieldErrors).forEach((f) => {
                setError(f, { type: 'custom', message: err.fieldErrors[f] })
              })
            } else {
              setError('root.formError', {
                type: 'custom',
                message:
                  'Something unexpected went wrong, please try again later.',
              })
            }
          }
        })}
      >
        {errors?.root?.formError && (
          <span>{errors.root.formError.message}</span>
        )}
        {inputs.map((input) => {
          const Component = input.component || getComponent(input)
          if (!Component) {
            console.warn(
              'No component found for type',
              input.type,
              'on field with name',
              input.name
            )
          }
          return (
            <Component
              error={errors?.[input.name]?.message}
              key={input.key || input.name}
              input={input}
              {...register(input.name)}
            />
          )
        })}
        <button>{isSubmitting ? 'loading ...' : 'Submit'}</button>
      </form>
    </FormProvider>
  )
}
