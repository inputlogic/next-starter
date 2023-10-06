import { useFormContext } from 'react-hook-form'
import { forwardRef } from 'react'
import { camelCaseToTitleCase } from 'util/case'
import { Label } from 'components/admin/label'

const defaultLabel = (name) =>
  camelCaseToTitleCase(name.split('.').reverse()[0])

export const CheckboxField = forwardRef(
  ({ id, name, label, error, ...props }, ref) => (
    <fieldset>
      <input type="checkbox" name={name} id={id} {...props} ref={ref} />
      <Label htmlFor={id}>{label || defaultLabel(name)}</Label>
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
