import { useUser } from '@/hooks/use-user'
import { useQuery } from '@tanstack/react-query'
import { get } from './api'

export const useDjangoList = (
  name,
  { args, query, namespace } = {},
  reactQueryArgs = {}
) => {
  const [user] = useUser()
  const reactQuery = useQuery({
    queryKey: [
      name,
      ...Object.entries(args || {}).flat(),
      ...Object.entries(query || {}).flat(),
      ...(namespace ? [namespace] : []),
    ],
    queryFn: () => get(name, { token: user?.token, args, params: query }),
    ...reactQueryArgs,
  })
  return [
    reactQuery.data?.results,
    { ...reactQuery, count: reactQuery.data?.count },
  ]
}

export const useDjangoResource = (
  name,
  { args, namespace } = {},
  reactQueryArgs = {}
) => {
  const [user] = useUser()
  const reactQuery = useQuery({
    queryKey: [name, ...Object.entries(args || {}).flat()],
    queryFn: () => get(name, { token: user?.token, args }),
    ...reactQueryArgs,
  })
  return [reactQuery.data, reactQuery]
}
