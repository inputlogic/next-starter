'use client'

import 'util/sentry'
import 'util/settings'
import 'styles/index.scss'
import { ViewTransitions } from 'next-view-transitions'
import { Maintenance } from 'components/maintenance'

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body>
          <Maintenance />
          {children}
        </body>
      </html>
    </ViewTransitions>
  )
}
