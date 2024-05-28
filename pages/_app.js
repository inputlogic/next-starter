import { QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from 'components/error-boundary'
import { Layouts } from 'components/layouts'
import { queryClient } from 'util/query-client'

import 'styles/index.scss'

function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Layouts layouts={Component.Layouts || []} pageProps={pageProps}>
          <Component {...pageProps} />
        </Layouts>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
