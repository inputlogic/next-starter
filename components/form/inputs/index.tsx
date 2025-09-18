import Case from 'case'
import { useFormContext } from 'react-hook-form'
import { connectByRef } from '../util/connect-by-ref'
import * as Inputs from 'components/inputs'

export const TextInput = connectByRef(Inputs.TextInput)
export const Checkbox = connectByRef(Inputs.Checkbox)
export const RadioButton = connectByRef(
  Inputs.RadioButton,
  // override the default props since radio auto label should be based
  // on the value rather than the name
  ({ name, error, props }) => ({
    name,
    error: error?.message,
    label: Case.capital((props.value as string) || ''),
  })
)
export const DatePickerSelect = connectByRef(
  Inputs.DatePickerSelect,
  // DatePicker needs special handling for value/onChange
  ({ name, error, props }) => ({
    name,
    error: error?.message,
    label: Case.capital(name.split('.').slice(-1)[0]),
    value: props.value,
    onValueChange: props.onChange,
  })
)

interface MultiSelectProps {
  name: string
  [key: string]: unknown
}

export const MultiSelect = ({ name, ...props }: MultiSelectProps) => {
  const { watch, setValue, formState } = useFormContext()
  return (
    <Inputs.MultiSelect
      onChange={(value: unknown) => setValue(name, value)}
      value={watch(name) || []}
      error={(formState?.errors[name] as { message?: string })?.message}
      {...props}
    />
  )
}

interface ComboboxSearchProps {
  name: string
  [key: string]: unknown
}

export const ComboboxSearch = ({ name, setQuery, options, ...props }: ComboboxSearchProps & { setQuery: (query: string) => void; options: Array<{ value: string; label: string }> }) => {
  const { watch, setValue, formState } = useFormContext()
  return (
    <Inputs.ComboboxSearch
      onChange={(value: unknown) => setValue(name, value)}
      value={watch(name) || ''}
      error={(formState?.errors[name] as { message?: string })?.message}
      setQuery={setQuery}
      options={options}
      {...props}
    />
  )
}
// TODO: get these other inputs working
// export const SelectInput = connectByRef(Inputs.SelectInput)
// export const FileUpload = connectByRef(Inputs.FileUpload)