import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Inputs/Textarea',
  component: Textarea,
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    name: 'sample-textarea',
    value: '',
    rows: 6,
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
