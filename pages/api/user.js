import withSession from '@/util/session'
import { get } from '@/util/api'

export default withSession(async (req, res) => {
  console.log('HIT: /api/user')
  const session = req.session.get('user')

  if (session) {
    const token = session.token
    // const user = await get('me', { token })
    const user = { id: 1, username: 'tester' }
    return res.json({ token, user })
  }

  return res.json({})
})
