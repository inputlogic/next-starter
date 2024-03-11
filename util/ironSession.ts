import { SessionOptions } from 'iron-session'

export interface SessionData {
  userId: string
  token: string
  isLoggedIn: boolean
}

export const defaultSession: SessionData = {
  userId: '',
  token: '',
  isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'session',
  cookieOptions: {
    // secure only works in `https` environments
    // if localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === 'production',
  },
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
