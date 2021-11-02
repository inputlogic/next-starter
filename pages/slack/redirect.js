import { useRouter } from 'next/router'

// import { supabase } from '@/util/supabase' **leaving here until we need, probs neeed it**

const Redirect = () => {
  const router = useRouter()
  console.log('router.query: ', router.query)
  const { code, error } = router.query

  console.log('code: ', code)
  console.log('error:', error)

  // TODO - capture code and/or error on this page (should this be a back-end route?)

  return (
    <>
      <title>Slack Redirect</title>
      <h1>Redirect</h1>
    </>
  )
}
Redirect.Layouts = ['BaseLayout']
export default Redirect
