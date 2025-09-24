import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MultiSelect, MultiSelectOption } from './multi-select'

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/Inputs/MultiSelect',
  component: MultiSelect,
}

export default meta
type Story = StoryObj<typeof MultiSelect>

const Template = (args: Parameters<typeof MultiSelect>[0]) => {
  const [value, setValue] = useState<MultiSelectOption[]>([])

  return <MultiSelect {...args} value={value} onChange={setValue} />
}

export const Default: Story = {
  render: Template,
  args: {
    label: 'Select Options',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    disabled: false,
    placeholder: 'Select options',
    error: '',
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
