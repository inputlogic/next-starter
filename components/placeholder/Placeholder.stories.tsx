import type { Meta, StoryObj } from '@storybook/react'
import { Placeholder } from 'components/placeholder'

const meta: Meta<typeof Placeholder> = {
  title: 'Components/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    name: 'Example placeholder',
  },
}