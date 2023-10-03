import { useFormContext } from 'react-hook-form'
import { forwardRef } from 'react'
import { Input } from 'components/admin/input'
import { Label } from 'components/admin/label'
import { Field } from 'components/admin/field'
import { FieldError } from 'components/admin/field-error'
import { camelCaseToTitleCase } from 'util/case'

const defaultLabel = (name) =>
  camelCaseToTitleCase(name.split('.').reverse()[0])

export const TextField = forwardRef(
  ({ id, label, name, error, ...props }, ref) => {
    return (
      <Field>
        <Label htmlFor={id}>{label || defaultLabel(name)}</Label>
        <Input
          id={id}
          type={['password', 'email'].includes(name) ? name : 'text'}
          name={name}
          {...props}
          ref={ref}
        />
        {error && <FieldError>{error}</FieldError>}
      </Field>
    )
  }
)

export const FormTextField = ({ id, name, ...props }) => {
  const {
    name: formName,
    register,
    formState: { errors },
  } = useFormContext() // retrieve all hook methods
  return (
    <TextField
      id={id || `${formName}.${name}`}
      error={errors[name]?.message}
      {...props}
      {...register(name)}
    />
  )
}
