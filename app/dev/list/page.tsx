'use client'

import { useQuery } from '@tanstack/react-query'
import { useList, ListProvider, Pagination, TextInput, List } from 'components/list'
import { Suspense } from 'react'

function ListPageContent() {
  const list = useList({
    id: 'example',
    defaultParams: {limit: 2},
    useQuery: (params) => useFakeRecords(params)
  })
  return (
    <div>
      <h1>List Demo</h1>
      <ListProvider {...list}>
        <TextInput name='search' placeholder='Search...' />
        <div>
          <List>
            {results => results.map(result =>
              <div key={result.id}>{result.title}</div>
            )}
          </List>
        </div>
        <Pagination />
      </ListProvider>
    </div>
  )
}

export default function ListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListPageContent />
    </Suspense>
  )
}

const useFakeRecords = (params: any) => useQuery({
  queryKey: ['example', params],
  queryFn: () => fetchFakeRecords(params)
})

const fetchFakeRecords = (params: any) => new Promise((resolve) => {
  const allResults = [
    {id: 1, title: 'Foo'},
    {id: 2, title: 'Bar'},
    {id: 3, title: 'Baz'},
    {id: 4, title: 'Lorem'},
  ]
  const results = allResults.filter(r => !params.search || r.title.includes(params.search))
  setTimeout(() => {
    resolve({
      count: results.length,
      results: results.slice(parseInt(params.offset) || 0, (parseInt(params.offset) || 0) + parseInt(params.limit))
    })
  }, 1000)
})