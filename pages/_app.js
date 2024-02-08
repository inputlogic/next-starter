import { QueryClientProvider } from '@tanstack/react-query'
import { AuthWrapper } from 'components/auth-wrapper'
import { Layouts } from 'components/layouts'
import { queryClient } from 'util/query-client'

import 'styles/index.scss'

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <Layouts layouts={Component.Layouts || []} pageProps={pageProps} >
          <Component {...pageProps} />
        </Layouts>
      </AuthWrapper>
    </QueryClientProvider>
  )
}

export default App
