import { useUser } from 'hooks/use-user'
import { useQuery } from 'react-query'
import { get } from 'util/api'

export const useDjangoList = (url, reactQueryArgs = {}) => {
  const [user] = useUser()
  const reactQuery = useQuery(
    [url],
    () => get(url, { token: user?.token }),
    reactQueryArgs
  )
  return [
    reactQuery.data?.results,
    { ...reactQuery, count: reactQuery.data?.count, url },
  ]
}

export const useDjangoResource = (url, reactQueryArgs = {}) => {
  const [user] = useUser()
  const reactQuery = useQuery(
    [url],
    () => get(url, { token: user?.token }),
    reactQueryArgs
  )
  return [reactQuery.data, { ...reactQuery, url }]
}
