import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from 'components/avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Avatar>

export const AvatarWithImage: Story = {
  args: {
    firstName: 'Input',
    src: 'https://media.licdn.com/dms/image/C560BAQESPbFa_JOfYA/company-logo_200_200/0/1652984433019?e=2147483647&v=beta&t=67fnAHMzzMt2gMpb8ldY2GoQCWCUB6gjUVpJ_E84UPk',
  },
}

export const AvatarNoImage: Story = {
  args: {
    firstName: 'Input',
  },
}
