import { useQuery } from 'hooks/use-query'

const fiveMinutes = 1000 * 60 * 5

interface IsLoggedInResponse {
  isLoggedIn: boolean
}

export const useIsLoggedIn = (): boolean | undefined => {
  const { data } = useQuery<IsLoggedInResponse>({
    url: '/public/user/is-logged-in',
    staleTime: fiveMinutes,
    gcTime: fiveMinutes
  })
  return data?.isLoggedIn
}