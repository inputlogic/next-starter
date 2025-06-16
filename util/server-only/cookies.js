import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions } from 'util/server-only/iron-session'

export const getToken = async () => {
  const session = await getIronSession(await cookies(), sessionOptions)
  return session.token
}

export const setToken = async (token) => {
  const session = await getIronSession(await cookies(), sessionOptions)
  session.token = token
  await session.save()
}

export const removeToken = async () => {
  const session = await getIronSession(await cookies(), sessionOptions)
  session.destroy()
}

