import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    href: { control: 'text' },
    target: { control: 'text' },
    variation: {
      control: { type: 'select', options: ['primary', 'secondary', 'outline', 'text', 'icon'] },
    },
    size: {
      control: { type: 'select', options: ['small', 'medium'] },
    },
    icon: { control: 'text' },
    iconPosition: { control: { type: 'select', options: ['left', 'right'] } },
    iconVariation: { control: { type: 'select', options: ['filled', 'stroked'] } },
    type: {
      control: { type: 'select', options: ['button', 'submit', 'reset'] },
    },
    isLoading: { control: 'boolean' },
    loadingText: { control: 'text' },
    className: { control: 'text' },
    fullWidth: { control: 'boolean' },
    hideText: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    href: '/',
    target: '_self',
    variation: 'primary',
    size: 'medium',
    children: 'Button Text',
    icon: 'home',
    iconPosition: 'right',
    iconVariation: 'stroked',
    isLoading: false,
    loadingText: 'Loading...',
    className: 'custom-class',
  },
}

export const AsButton: Story = {
  args: {
    variation: 'primary',
    size: 'medium',
    children: 'Button Text',
    icon: 'home',
    iconPosition: 'right',
    iconVariation: 'stroked',
    type: 'button',
    isLoading: false,
    loadingText: 'Loading...',
    className: 'custom-class',
  },
}