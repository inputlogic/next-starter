'use client'

import { Button } from 'components/button'

export default function SentryPage() {
  return (
    <div>
      <h1>Sentry Demo</h1>
      <p>
        To enable sentry, make sure to add a NEXT_PUBLIC_SENTRY_DSN env variable. Click the button below to test that it's working.
      </p>
      <p>
        The @sentry/nextjs package has other fancy features but it involves a lot of mess to integrate. See <a href='https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/'>docs</a>. <a href='https://github.com/getsentry/sentry-javascript/issues/4249'>Also, the Sentry team appear to be against the idea of keeping your codebase clean...</a>
      </p>
      <Button onClick={() => { throw new Error('Next starter test error') }}>Sentry error test</Button>
    </div>
  )
}
