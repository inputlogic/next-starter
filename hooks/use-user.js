import { useQuery } from 'hooks/use-query'

export const useUser = () => 
  useQuery({url: '/user/my-profile'})
