import axios from 'axios'
import { AuthCredentials } from './auth'
import { SessionData } from 'util/ironSession'

export const getSession = async (): Promise<SessionData> => {
  const { data } = await axios.get('/api/session')
  return data
}

export const logoutSession = async () => {
  const { data } = await axios.get('/api/session?action=logout')
  return data
}

export const loginSession = async (credentials: AuthCredentials) => {
  const { data } = await axios.post('/api/session', credentials)
  return data
}

export const signupSession = async (credentials: AuthCredentials) => {
  const { data } = await axios.post('/api/session?action=signup', credentials)
  return data
}
