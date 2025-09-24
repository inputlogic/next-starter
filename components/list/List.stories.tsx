import { Suspense } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Meta, StoryObj } from '@storybook/react'
import { useList, ListProvider, List, TextInput, Pagination } from 'components/list'

const meta: Meta<typeof ListProvider> = {
  title: 'Components/List/ListProvider',
  component: ListProvider,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ListProvider>

const wait = async (timeout: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, timeout))

interface MockResult {
  id: number
  title: string
}

interface MockResponse {
  count: number
  results: MockResult[]
}

const mockResults: MockResult[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  title: `Example ${i}`
}))

const mockRequest = async (params: Record<string, any>): Promise<MockResponse> => {
  await wait(1000)
  const results = params.search
    ? mockResults.filter(result => result.title.includes(params.search))
    : mockResults
  return {
    count: results.length,
    results: results.slice(params.offset || 0, params.limit)
  }
}

const Template = () => {
  const methods = useList({
    id: 'posts',
    defaultParams: { limit: 3 },
    useQuery: (params: Record<string, any>): UseQueryResult<MockResponse, Error> => useQuery({
      queryKey: ['posts', params],
      queryFn: async () => {
        return await mockRequest(params)
      }
    })
  })

  return (
    <ListProvider {...methods}>
      <div>
        <div>
          <TextInput name='search' placeholder='Search...' />
        </div>
        <div>
          <List>
            {(results: MockResult[]) => results.map(result =>
              <div key={result.id}>{result.title}</div>
            )}
          </List>
        </div>
        <Pagination />
      </div>
    </ListProvider>
  )
}

export const Default: Story = {
  render: () => (
    <Suspense fallback={<div>Loading...</div>}>
      <Template />
    </Suspense>
  )
}