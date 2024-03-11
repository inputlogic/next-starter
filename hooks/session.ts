import axios from 'axios'
import { LoginCredentials } from './login'
import { SessionData } from 'util/ironSession'

export const getSession = async (): Promise<SessionData> => {
  const { data } = await axios.get('/api/session')
  return data
}

export const logoutSession = async () => {
  const { data } = await axios.get('/api/session?action=logout')
  return data
}

export const loginSession = async (credentials: LoginCredentials) => {
  const { data } = await axios.post('/api/session', credentials)
  return data
}
