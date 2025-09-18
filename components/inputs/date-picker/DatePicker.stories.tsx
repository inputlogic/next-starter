import type { Meta, StoryObj } from '@storybook/react'
import { DatePickerSelect } from './date-picker'

const meta: Meta<typeof DatePickerSelect> = {
  title: 'Components/Inputs/DatePickerSelect',
  component: DatePickerSelect,
}

export default meta
type Story = StoryObj<typeof DatePickerSelect>

export const Default: Story = {
  args: {
    id: 'sample-date-picker-id',
    name: 'sample-date-picker',
    label: 'Sample Date Picker Label',
    placeholder: 'Click to select a date',
    readOnly: false,
    className: '',
    validationState: '',
    variation: 'default',
    style: {},
  },
}

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
  },
}

export const WithError: Story = {
  args: {
    ...Default.args,
    validationState: 'error',
  },
}
