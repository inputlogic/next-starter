import { withIronSessionApiRoute } from 'iron-session/next'

export default function withSession(handler) {
  return withIronSessionApiRoute(handler, {
    password: process.env.SESSION_SECRET,
    cookieName: 'session',
    cookieOptions: {},
  })
}
