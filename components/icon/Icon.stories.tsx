import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'chevron-down',
  },
}
