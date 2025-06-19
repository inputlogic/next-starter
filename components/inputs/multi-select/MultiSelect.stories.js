import { useState } from 'react'
import { MultiSelect } from './multi-select'

export default {
  title: 'Components/Inputs/MultiSelect',
  component: MultiSelect,
}

const Template = (args) => {
  const [value, setValue] = useState([])

  return <MultiSelect {...args} value={value} onChange={setValue} />
}

export const Default = Template.bind({})
Default.args = {
  label: 'Select Options',
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ],
  disabled: false,
  placeholder: 'Select options',
  error: '',
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true,
}

export const WithError = Template.bind({})
WithError.args = {
  ...Default.args,
  error: 'This is an error message',
}
