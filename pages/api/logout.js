import withSession from '@/util/session'

export default withSession(async (req, res) => {
  console.log('HIT: /api/logout')
  req.session.destroy()
  res.json({})
})
