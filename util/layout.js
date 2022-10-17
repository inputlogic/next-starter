import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useRouter } from 'next/router'
import { ErrorDisplay } from 'components/error'
import { InlineLoader } from 'components/loading'
import { protectedUrls, adminUrls } from 'util/urls'
import { useUser } from 'hooks/use-user'

import BaseLayout from 'components/layouts/base-layout'

const queryClient = new QueryClient()

const LAYOUTS = {
  BaseLayout: BaseLayout,
}

export function buildLayout(layouts, Component, pageProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthedContent
        pageProps={pageProps}
        layouts={layouts}
        Component={Component}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

const AuthedContent = ({ pageProps, layouts, Component }) => {
  const { user, userIsLoading, userIsError, userError } = useUser()
  const router = useRouter()

  const pathIsProtected = protectedUrls.filter((url) => {
    return router?.pathname?.startsWith(url)
  })

  if (userIsLoading) {
    return <InlineLoader text="Loading" />
  }

  if (userIsError) {
    return <ErrorDisplay error={userError} />
  }

  if (pathIsProtected.length && !user) {
    router.push('/')
    return <></>
  }

  const Layout = LAYOUTS[layouts[0]]
  if (layouts.length > 0) {
    return (
      <Layout {...pageProps}>
        {buildLayout(layouts.slice(1), Component, pageProps)}
      </Layout>
    )
  }
  return <Component {...pageProps} />
}
