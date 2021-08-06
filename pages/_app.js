import Index from './index'
import settings from '@/util/settings'
import { buildLayout } from '@/util/layout'
import { useUser } from '@/util/hooks'

import '@/styles/index.scss'

function App({ Component, pageProps, router }) {
  const { user, token } = useUser()
  const accountPath = router.pathname.startsWith('/account')
  const adminPath = router.pathname.startsWith('/admin')
 
  // Default to a blank component until we figure out what we're rendering based on auth
  let ValidComponent = () => <></>

  // If we're on a protected path without a valid user, go to index
  if((adminPath && !user?.isAdmin) || (accountPath && !user)) {
    if (process.browser) router.push('/')
    ValidComponent = Index
  }

  // If we're not on a protected path or user is admin, render as normal
  else if(!adminPath || user?.isAdmin) {
    ValidComponent = Component
  }

  // Wrap component in layouts (if it has them) and inject props, user and token
  return buildLayout(ValidComponent.Layouts || [], ValidComponent, {...pageProps, user, token})
}

export default App
