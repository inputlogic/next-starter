import { useState } from 'react'
import { Pagination } from './pagination'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    totalPages: {
      control: 'number',
    },
    currentPage: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

const Template = (args: any) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage)

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      hrefForPage={(page) => `#page-${page}`}
    />
  )
}

export const Default: Story = {
  render: Template,
  args: {
    totalPages: 5,
    currentPage: 1,
  },
}

export const MorePages: Story = {
  render: Template,
  args: {
    totalPages: 10,
    currentPage: 5,
  },
}