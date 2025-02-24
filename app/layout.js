'use client'

import 'util/sentry'
import 'util/settings'
import 'styles/index.scss'

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  )
}
