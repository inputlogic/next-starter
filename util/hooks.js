import { useUser } from '@/hooks/use-user'
import { useQuery } from 'react-query'
import { get } from './api'

export const useDjangoList = (name, {args, query, namespace} = {}, reactQueryArgs = {}) => {
  const [user] = useUser()
  const reactQuery = useQuery(
    [
      name,
      ...Object.entries(args || {}).flat(),
      ...Object.entries(query || {}).flat(),
			...(namespace ? [namespace] : [])
    ],
    () => get(name, { token: user?.token, args, params: query }),
    reactQueryArgs
  )
  return [reactQuery.data?.results, { ...reactQuery, count: reactQuery.data?.count }]
}

export const useDjangoResource = (name, {args, namespace} = {}, reactQueryArgs = {}) => {
  const [user] = useUser()
  const reactQuery = useQuery(
    [
      name,
      ...Object.entries(args || {}).flat(),
    ],
    () => get(name, { token: user?.token, args }),
    reactQueryArgs
  )
  return [reactQuery.data, reactQuery]
}
