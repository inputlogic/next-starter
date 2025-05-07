'use client'

import 'util/sentry'
import 'util/settings'
import 'styles/index.scss'
import { Maintenance } from 'components/maintenance'

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Maintenance />
        {children}
      </body>
    </html>
  )
}
