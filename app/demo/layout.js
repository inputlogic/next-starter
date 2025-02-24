'use client'

import {Header} from 'components/demo/header'
import styles from './layout.module.scss'
import { QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from 'components/error-boundary'
import { queryClient } from 'util/query-client'
import { Notification } from 'components/notification/'
import { SvgDefs } from 'components/svg-defs'

const DemoLayout = ({children}) =>
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <Notification />
      <div className={styles.layout}>
        <Header />
        <main>
          {children}
        </main>
      </div>
    </QueryClientProvider>
    <SvgDefs />
  </ErrorBoundary>

export default DemoLayout
