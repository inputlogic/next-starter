import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions } from 'util/server-only/iron-session'

interface SessionData {
  token?: string
  [key: string]: unknown
}

export const getToken = async (): Promise<string | undefined> => {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  return session.token
}

export const setToken = async (token: string): Promise<void> => {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  session.token = token
  await session.save()
}

export const removeToken = async (): Promise<void> => {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  session.destroy()
}