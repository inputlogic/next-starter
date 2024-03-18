import { QueryClientProvider } from '@tanstack/react-query'
import { Layouts } from 'components/layouts'
import { queryClient } from 'util/query-client'

import 'styles/index.scss'

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layouts layouts={Component.Layouts || []} pageProps={pageProps}>
        <Component {...pageProps} />
      </Layouts>
    </QueryClientProvider>
  )
}

export default App
