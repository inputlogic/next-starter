import type { Meta, StoryObj } from '@storybook/react'
import { TextInput } from './text-input'

const meta: Meta<typeof TextInput> = {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
}

export default meta
type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  args: {
    type: 'text',
    name: 'sample-text-input',
    value: '',
    label: 'Sample Label',
    placeholder: 'Enter some text',
    error: false,
    id: 'sample-id',
  },
}

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
  },
}
