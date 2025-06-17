import Case from 'case'
import { connectByRef } from '../util/connect-by-ref'
import * as Inputs from 'components/inputs'

export const TextInput = connectByRef(Inputs.TextInput)
export const Checkbox = connectByRef(Inputs.Checkbox)
export const RadioButton = connectByRef(
  Inputs.RadioButton,
  // override the default props since radio auto label should be based
  // on the value rather than the name
  ({name, error, props}) =>
    ({name, error, label: Case.capital(props.value || '')})
)
export const DatePickerSelect = connectByRef(
  Inputs.DatePickerSelect,
  // DatePicker needs special handling for value/onChange
  ({name, error, props}) => ({
    name,
    error: error?.message,
    label: Case.capital(name.split('.').slice(-1)[0]),
    value: props.value,
    onValueChange: props.onChange
  })
)
// TODO: get these other inputs working
// export const SelectInput = connectByRef(Inputs.SelectInput)
// export const FileUpload = connectByRef(Inputs.FileUpload)
