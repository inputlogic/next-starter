import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions } from 'util/server-only/iron-session'

// Legacy API routes (Pages Router)
export const cookieToken = async ({req, res}) => {
  const session = await getIronSession(req, res, sessionOptions)
  return session.token
}

export const cookieLogin = async ({req, res, token}) => {
  const session = await getIronSession(req, res, sessionOptions)
  session.token = token
  await session.save()
}

export const cookieLogout = async ({req, res}) => {
  const session = await getIronSession(req, res, sessionOptions)
  session.destroy()
}

// App Router versions
export const getToken = async () => {
  const session = await getIronSession(cookies(), sessionOptions)
  return session.token
}

export const setToken = async (token) => {
  const session = await getIronSession(cookies(), sessionOptions)
  session.token = token
  await session.save()
}

export const removeToken = async () => {
  const session = await getIronSession(cookies(), sessionOptions)
  session.destroy()
}

