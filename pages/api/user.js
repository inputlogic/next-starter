import withSession from 'util/session'
import { get } from 'util/api'

export default withSession(async (req, res) => {
  console.log('HIT: /api/user')
  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
  }
  const session = req.session.user

  if (session) {
    const token = session.token
    const user = await get('me', { token })
    return res.json({ token, user })
  }

  return res.json({})
})
