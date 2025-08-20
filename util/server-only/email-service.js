import { NextResponse } from 'next/server'

export function checkEmailServiceAuth(request) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Missing or invalid authorization header' },
      { status: 401 }
    )
  }

  const token = authHeader.substring(7) // Remove 'Bearer ' prefix
  const expectedToken = process.env.EMAIL_PROVIDER_API_KEY

  if (!expectedToken) {
    console.error('EMAIL_PROVIDER_API_KEY environment variable not set')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  if (token !== expectedToken) {
    return NextResponse.json(
      { error: 'Invalid authorization token' },
      { status: 401 }
    )
  }

  return null // Auth passed
}
