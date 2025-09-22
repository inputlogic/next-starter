'use client'

import 'util/sentry'
import 'util/settings'
import 'styles/index.scss'
import { Maintenance } from 'components/maintenance'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Maintenance />
        {children}
      </body>
    </html>
  )
}
