import withSession from '@/util/session'
import { get, post } from '@/util/api'

export default withSession(async (req, res) => {
  console.log('HIT: /api/login')
  try {
    // Uncomment below to use Django API
    // const { username, password } = req.body
    // const { token } = await post('authAdmin', {body: {username, password}})
    // const user = await get('me', {token})
    
    // Temporary / Test user
    const token = 'test-token'
    const user = { id: 1, username: 'tester' }

    req.session.set('user', { id: user.id, token })
    await req.session.save()
    res.json({ token, user })
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).json(error)
  }
})
