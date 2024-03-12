import { axiosClient } from 'util/axiosClient'
import { useQuery } from '@tanstack/react-query'

export interface GetUserResponse {
  id: string
  email: string
  firstName: string
  lastName: string
}

const getUser = async (): Promise<GetUserResponse> => {
  const { data } = await axiosClient.get<GetUserResponse>('/user/my-profile')
  return data
}

export const useGetUser = () => {
  return useQuery<GetUserResponse, Error>({
    queryKey: ['userProfile'],
    queryFn: getUser,
  })
}
