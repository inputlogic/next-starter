import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions } from 'util/server-only/iron-session'

export const getToken = async () => {
  const session = await getIronSession(cookies(), sessionOptions)
  return session.token
}

export const getSessionValue = async (key) => {
  const session = await getIronSession(cookies(), sessionOptions)
  return session[key]
}

export const setToken = async (token, additionalData = {}) => {
  const session = await getIronSession(cookies(), sessionOptions)
  session.token = token
  
  // Add any additional key-value pairs to the session
  Object.entries(additionalData).forEach(([key, value]) => {
    session[key] = value
  })
  
  await session.save()
}

export const removeToken = async () => {
  const session = await getIronSession(cookies(), sessionOptions)
  session.destroy()
}

