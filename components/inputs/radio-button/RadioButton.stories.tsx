import type { Meta, StoryObj } from '@storybook/react'
import { RadioButton } from './radio-button'

const meta: Meta<typeof RadioButton> = {
  title: 'Components/Inputs/RadioButton',
  component: RadioButton,
}

export default meta
type Story = StoryObj<typeof RadioButton>

export const Default: Story = {
  args: {
    id: 'sample-radio-id',
    name: 'sample-radio-name',
    value: 'sample-value',
    label: 'Sample Label',
  },
}
