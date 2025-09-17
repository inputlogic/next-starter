import { ReactNode, ComponentType } from 'react'
import { useListContext } from 'components/list/list-provider'

interface ListProps {
  children: (results: any[]) => ReactNode
  Error?: ComponentType
  Loading?: ComponentType
  Empty?: ComponentType
}

export const List = ({
  children,
  Error = () => 'Error',
  Loading = () => 'Loading...',
  Empty = () => 'Empty'
}: ListProps) => {
  const { query } = useListContext()

  if (query.isError) return <Error />
  if (!query.data) return <Loading />
  if (!query.data.results?.length) return <Empty />

  return <>{children(query.data.results)}</>
}