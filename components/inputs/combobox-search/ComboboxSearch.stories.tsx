import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ComboboxSearch, ComboboxOption } from './combobox-search'

const meta: Meta<typeof ComboboxSearch> = {
  title: 'Components/Inputs/ComboboxSearch',
  component: ComboboxSearch,
}

export default meta
type Story = StoryObj<typeof ComboboxSearch>

const Template = (args: Parameters<typeof ComboboxSearch>[0]) => {
  const [value, setValue] = useState<ComboboxOption | string>('')
  const [options, setOptions] = useState<ComboboxOption[]>(args.options)

  const setQuery = (query: string) => {
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

export const Default: Story = {
  render: Template,
  args: {
    label: 'Search Options',
    placeholder: 'Search options',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    isLoading: false,
    disabled: false,
  },
}

export const Loading: Story = {
  render: Template,
  args: {
    ...Default.args,
    isLoading: true,
  },
}

export const Disabled: Story = {
  render: Template,
  args: {
    ...Default.args,
    disabled: true,
  },
}

export const WithError: Story = {
  render: Template,
  args: {
    ...Default.args,
    error: 'This is an error message',
  },
}
