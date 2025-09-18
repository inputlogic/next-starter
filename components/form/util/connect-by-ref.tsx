import Case from 'case'
import { useFormContext, FieldError } from 'react-hook-form'
import { ComponentType } from 'react'

interface DefaultPropsBuilderParams {
  name: string
  error?: FieldError
  props: Record<string, unknown>
}

interface DefaultPropsBuilderResult extends Record<string, unknown> {
  name: string
  error?: string
  label: string
}

type PropsBuilder<T = Record<string, unknown>> = (params: DefaultPropsBuilderParams) => T

interface ConnectedComponentProps {
  name: string
  [key: string]: unknown
}

/**
 * This is a hoc that wraps a form input.
 * Instead of passing in the props {...regsiter(name)} to
 * the input as you normally would, you only need to pass
 * a name prop and it should work. The input must be placed
 * inside a parent component that is a FormProvider. Generally
 * this will mean it must be inside of the form component
 * found at /components/form/form
 *
 * Here is an example:
 *
 * before:
 * <TextInput
 *   name='email'
 *   error={formState.errors[name]?.message}
 *   {...register('email')}
 * />
 *
 * after:
 * <TextInput name='email' />
 *
 * The props builder function allows you to customize which other props
 * get passed along to your underlying Input component.
 * For example, if you look at defaultPropsBuilder, a default
 * label is provided based on the name. For something like a Radio
 * input, this doesn't make sense since multiple Radios will have the
 * same name, so in that case you can override this function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const connectByRef = <T extends ComponentType<any>>(
  Component: T,
  propsBuilder: PropsBuilder = defaultPropsBuilder
) => {
  const ConnectedComponent = ({ name, ...props }: ConnectedComponentProps) => {
    const { register, formState } = useFormContext()
    const error = formState?.errors?.[name] as FieldError | undefined
    return <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(propsBuilder({ name, error, props }) as any)}
      {...register(name)}
      {...props}
    />
  }
  ConnectedComponent.displayName = `Connected(${Component.displayName || Component.name || 'Component'})`
  return ConnectedComponent
}

const defaultPropsBuilder = ({ name, error }: DefaultPropsBuilderParams): DefaultPropsBuilderResult => ({
  name,
  error: error?.message,
  label: Case.capital(name.split('.').slice(-1)[0])
})