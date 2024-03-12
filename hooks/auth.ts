import axiosClient from 'util/axiosClient'

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  userId: string
}

export const login = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  const { data } = await axiosClient.post<AuthResponse>(
    '/public/user/login',
    credentials
  )
  return data
}

export const signup = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  const { data } = await axiosClient.post<AuthResponse>(
    '/public/user/signup',
    credentials
  )
  return data
}
