'use client'

import 'util/sentry'
import 'util/settings'
import 'styles/index.scss'
import { QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from 'components/error-boundary'
import { queryClient } from 'util/query-client'
import { Notification } from 'components/notification/'
import { TemporaryNav } from 'components/temporary-nav'
import { SvgDefs } from 'components/svg-defs'

export default function RootLayout({ children }) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TemporaryNav />
        <Notification />
        {children}
      </QueryClientProvider>
      <SvgDefs />
    </ErrorBoundary>
  )
}
