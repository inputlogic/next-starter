import axios from 'axios'
import { AuthCredentials } from './auth'
import { BasicSessionData, SessionData } from 'util/ironSession'
import { useMutation, useQuery } from '@tanstack/react-query'

export type SessionResponse = {
  userId: string
}

export const getSession = async (): Promise<SessionData> => {
  const { data } = await axios.get('/api/session')
  return data
}

export const getBasicSession = async (): Promise<BasicSessionData> => {
  const { data } = await axios.get('/api/session?action=basic')
  return data
}

export const useBasicSession = () => {
  return useQuery<BasicSessionData, Error>({
    queryKey: ['basicSession'],
    queryFn: getBasicSession,
  })
}

export const logoutSession = async () => {
  const { data } = await axios.get('/api/session?action=logout')
  return data
}

export const loginSession = async (credentials: AuthCredentials) => {
  const { data } = await axios.post<SessionResponse>(
    '/api/session',
    credentials
  )
  return data
}

export const signupSession = async (credentials: AuthCredentials) => {
  const { data } = await axios.post<SessionResponse>(
    '/api/session?action=signup',
    credentials
  )
  return data
}
