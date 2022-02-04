import { QueryClientProvider, QueryClient } from 'react-query'
import { protectedUrls, adminUrls } from 'util/urls'
import { ErrorDisplay } from 'components/error'
import { InlineLoader } from '@/components/loading'
import Index from './index'
import { buildLayout } from 'util/layout'
import { useUser } from 'hooks/use-user'

import 'styles/index.scss'

function App({ Component, pageProps, router }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthDetermined
        Component={Component}
        pageProps={pageProps}
        router={router}
      />
    </QueryClientProvider>
  )
}

const AuthDetermined = ({ Component, pageProps, router }) => {
  const { isLoading, isError, data: user } = useUser()
  const pathIsProtected = protectedUrls.filter((url) => {
    return router?.pathname?.startsWith(url)
  })
  const pathIsAdmin = adminUrls.filter((url) => {
    return router?.pathname?.startsWith(url)
  })

  // Default to a blank component until we figure out what we're rendering based on auth
  let ValidComponent = () => <></>

  if (isLoading) {
    return <InlineLoader text="Loading..." />
  }

  if (isError) {
    return (
      <ErrorDisplay text="There has been an error validating your user session" />
    )
  }

  // If we're on a protected path without a valid user, go to index
  if (
    (pathIsAdmin.length && !user?.isAdmin) ||
    (pathIsProtected.length && !user)
  ) {
    if (typeof window !== 'undefined') router.push('/')
    ValidComponent = Index
  }
  // If we're not on a protected path or user is admin, render as normal
  else if (!pathIsAdmin.length || user?.isAdmin) {
    ValidComponent = Component
  }

  // Wrap component in layouts (if it has them) and inject props & user
  return buildLayout(ValidComponent.Layouts || [], ValidComponent, {
    ...pageProps,
    user,
  })
}

export default App
