import { useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { options } from 'util/api'
import { useUser } from 'hooks/use-user'

const InputField = ({ inputProps, labelProps, error, hint }) => (
  <div>
    <label {...labelProps} />
    <br />
    <input {...inputProps} />
    {error && <span>{error}</span>}
    {hint && <span>{hint}</span>}
  </div>
)

const inputTypes = {
  string: ({ label, name, required, readOnly }) => {
    if (name.includes('password')) {
      return (props) => (
        <InputField
          labelProps={{ children: label }}
          inputProps={{ type: 'password', ...props }}
        />
      )
    }
    return (props) => (
      <InputField
        labelProps={{ children: label }}
        inputProps={{ type: 'text', placeholder: label, name, ...props }}
      />
    )
  },
  email:
    ({ label, name, required, readOnly }) =>
    (props) =>
      (
        <InputField
          labelProps={{ children: label }}
          inputProps={{ type: 'email', placeholder: label, name, ...props }}
        />
      ),
  integer:
    ({ label, name, required, readOnly }) =>
    (props) =>
      (
        <InputField
          labelProps={{ children: label }}
          inputProps={{ type: 'number', placeholder: label, name, ...props }}
        />
      ),
  datetime:
    ({ label, name, required, readOnly }) =>
    (props) =>
      (
        <InputField
          labelProps={{ children: label }}
          inputProps={{
            type: 'datetime-local',
            placeholder: label,
            name,
            ...props,
          }}
        />
      ),
  boolean:
    ({ label, name, required, readOnly }) =>
    (props) =>
      (
        <label>
          {label}
          <input type="checkbox" name={name} {...props} />,
        </label>
      ),
  field:
    ({ name }) =>
    () =>
      <div>{name} Field (TODO)</div>,
}

export const AutoForm = () => {
  const { user } = useUser()
  const { data: meta } = useQuery(['test'], () => {
    const res = options('adminUsers', { token: user?.token })
    return res
  })
  const detail = meta?.actions?.POST
  if (!detail) return
  return (
    <div>
      <form>
        {Object.keys(detail).map((k) => {
          console.log(detail[k].type)
          if (detail[k].readOnly) {
            return <div>{k} read-only</div>
          }
          let Input = inputTypes[detail[k].type]?.({ name: k, ...detail[k] })
          if (!Input) {
            console.warn(
              'No input found for type',
              detail[k].type,
              'on field with name',
              k
            )
          }
          return (
            <div>
              <Input />
            </div>
          )
          // <input type="text" name={k} placeholder={detail[k].label} />
        })}
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
