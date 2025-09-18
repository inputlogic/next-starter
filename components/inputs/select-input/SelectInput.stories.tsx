import type { Meta, StoryObj } from '@storybook/react'
import { SelectInput } from './select-input'

const meta: Meta<typeof SelectInput> = {
  title: 'Components/Inputs/SelectInput',
  component: SelectInput,
}

export default meta
type Story = StoryObj<typeof SelectInput>

export const Default: Story = {
  args: {
    id: 'sample-id',
    name: 'sample-name',
    label: 'Sample Label',
    placeholder: 'Select an option',
    defaultValue: '',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    required: false,
  },
}
