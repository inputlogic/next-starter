import { login } from 'hooks/login'
import { getIronSession } from 'iron-session'
import { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'
import { SessionData, defaultSession, sessionOptions } from 'util/ironSession'

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bodyString = req.body
    const body = JSON.parse(bodyString)
    const loginResponse = await login(body)

    const session = await getIronSession<SessionData>(cookies(), sessionOptions)

    session.userId = loginResponse.userId
    session.token = loginResponse.token
    session.isLoggedIn = true
    await session.save()

    res.status(200).json({ userRole: loginResponse.role })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const action = req.query.action as string
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if (action === 'logout') {
    session.destroy()
    res.status(200).json(defaultSession)
    return
  }

  if (session.isLoggedIn !== true) {
    res.status(200).json(defaultSession)
    return
  }

  res.status(200).json(session)
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await postHandler(req, res)
      break
    case 'GET':
      await getHandler(req, res)
      break
    default:
      res.setHeader('Allow', ['POST', 'GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
