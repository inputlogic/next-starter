import { NextResponse } from 'next/server'
import * as EmailComponents from 'emails'
import { checkEmailServiceAuth } from 'util/server-only/email-service'

export async function GET(request) {
  const authError = checkEmailServiceAuth(request)
  if (authError) return authError
  const emails = Object.values(EmailComponents).map((Component) => {
    return Component.definition
  })

  return NextResponse.json({ results: emails, count: emails.length })
}
