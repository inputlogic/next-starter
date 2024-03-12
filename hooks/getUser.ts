import { axiosClient } from 'util/axiosClient'

export interface GetUserResponse {
  userId: string
  firstName: string
  lastName: string
}

export const getUser = async (): Promise<GetUserResponse> => {
  const { data } = await axiosClient.get<GetUserResponse>('/user/my-profile')
  return data
}
