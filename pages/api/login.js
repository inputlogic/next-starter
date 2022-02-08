import withSession from 'util/session'
import { get, post } from 'util/api'

export default withSession(async (req, res) => {
  console.log('HIT: /api/login')
  try {
    const { token } = await post('login', req.body)
    const user = await get('me', { token })
    req.session.user = { id: user.id, token }
    await req.session.save()
    res.json({ token, user })
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).json(error)
  }
})
