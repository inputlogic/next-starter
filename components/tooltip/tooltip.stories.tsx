import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    label: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'] as const
    },
    offset: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '50px', cursor: 'pointer' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Top: Story = {
  args: {
    label: 'Top',
    position: 'top',
    offset: 5,
    children: <span>Hover Me</span>,
  },
}

export const Bottom: Story = {
  args: {
    label: 'Bottom',
    position: 'bottom',
    offset: 5,
    children: <span>Hover Me</span>,
  },
}

export const Right: Story = {
  args: {
    label: 'Right',
    position: 'right',
    offset: 5,
    children: <span>Hover Me</span>,
  },
}

export const Left: Story = {
  args: {
    label: 'Left',
    position: 'left',
    offset: 5,
    children: <span>Hover Me</span>,
  },
}