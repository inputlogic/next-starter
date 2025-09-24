'use client'

import { useEffect, ReactNode } from 'react'
import { Header } from 'components/dev'
import styles from './layout.module.scss'
import { QueryClientProvider } from '@tanstack/react-query'
import ErrorBoundary from 'components/error-boundary'
import { queryClient } from 'util/query-client'
import { Notification } from 'components/notification/'
import { SvgDefs } from 'components/svg-defs'
import { useTheme } from 'hooks/dev/use-theme'

const DemoLayout = ({children}: {children: ReactNode}) => {
  const { theme } = useTheme()
  
  // Apply theme color to html element for overscroll
  useEffect(() => {
    const htmlElement = document.documentElement
    
    if (theme === 'dark') {
      htmlElement.style.backgroundColor = '#121212'
    } else {
      htmlElement.style.backgroundColor = '#ffffff'
    }
    
    return () => {
      htmlElement.style.backgroundColor = ''
    }
  }, [theme])
  
  return (
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
  )
}

export default DemoLayout
