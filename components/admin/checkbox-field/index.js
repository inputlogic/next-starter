import { useFormContext } from 'react-hook-form'
import { forwardRef } from 'react'
import { Label } from 'components/admin/label'

export const CheckboxField = forwardRef(
  ({ id, name, error, ...props }, ref) => (
    <fieldset>
      <input type="checkbox" name={name} id={id} {...props} ref={ref} />
      <Label htmlFor={id}>{name}</Label>
      {error && <div>{error}</div>}
    </fieldset>
  )
)

export const FormCheckboxField = ({ id, name, ...props }) => {
  const {
    register,
    name: formName,
    formState: { errors },
  } = useFormContext() // retrieve all hook methods
  id = id || `${formName}.${name}`
  return (
    <CheckboxField
      id={id}
      error={errors[name]?.message}
      {...props}
      {...register(name)}
    />
  )
}
