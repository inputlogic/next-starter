import { login, signup } from 'hooks/auth'
import { getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { SessionData, defaultSession, sessionOptions } from 'util/ironSession'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('cache-control', 'no-store, max-age=0')
  const session = await getIronSession<SessionData>(req, res, sessionOptions)

  // POST request handling (for session creation)
  if (req.method === 'POST') {
    const action = req.query.action as string

    try {
      let authResponse = null
      if (action === 'signup') {
        authResponse = await signup(req.body)
      } else {
        authResponse = await login(req.body)
      }

      session.userId = authResponse.userId
      session.token = authResponse.token
      session.isLoggedIn = true
      await session.save()

      res.status(200).json({ userId: authResponse.userId })
    } catch (error: any) {
      if (error.response && error.response.status) {
        if (error.response.data) {
          res.status(error.response.status).json(error.response.data)
        } else {
          res.status(error.response.status).json({
            message:
              error.response.statusText ||
              'An error occurred during the operation.',
          })
        }
      } else {
        res.status(500).json({ message: 'Internal Server Error' })
      }
    }

    return
  }

  // GET request handling
  if (req.method === 'GET') {
    const action = req.query.action as string

    // Handle logout
    if (action === 'logout') {
      session.destroy()
      return res.status(200).json(defaultSession)
    }

    if (session.isLoggedIn !== true) {
      res.status(200).json(defaultSession)
    } else {
      if (action === 'basic') {
        // Don't expose the token to the client
        const { token, ...basicSession } = session
        res.status(200).json(basicSession)
        return
      } else {
        res.status(200).json(session)
      }
    }
    return
  }

  // If the method is not supported
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
