import axiosClient from 'util/axiosClient'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  userId: string
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await axiosClient.post<LoginResponse>(
    '/public/user/login',
    credentials
  )
  return data
}
