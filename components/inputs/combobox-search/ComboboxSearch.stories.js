import { useState } from 'react'
import { ComboboxSearch } from './combobox-search'

export default {
  title: 'Components/Inputs/ComboboxSearch',
  component: ComboboxSearch,
}

const Template = (args) => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState(args.options)

  const setQuery = (query) => {
    if (!query) {
      setOptions(args.options)
    } else {
      const lowerQuery = query.toLowerCase()
      setOptions(
        args.options.filter((option) =>
          option.label.toLowerCase().includes(lowerQuery)
        )
      )
    }
  }

  return (
    <ComboboxSearch
      {...args}
      value={value}
      onChange={setValue}
      setQuery={setQuery}
      options={options}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  label: 'Search Options',
  placeholder: 'Search options',
  searchPlaceholder: 'Type to search...',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ],
  isLoading: false,
  disabled: false,
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  isLoading: true,
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
