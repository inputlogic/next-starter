import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    id: 'sample-checkbox-id',
    name: 'sample-checkbox-name',
    value: 'sample-value',
    label: 'Sample Label',
  },
}
