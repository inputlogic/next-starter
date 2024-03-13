import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { SessionData, sessionOptions } from 'util/ironSession'

export async function middleware(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  const isAuthenticatedRoute = request.nextUrl.pathname.startsWith('/app')
  const isLoggedIn = session.isLoggedIn === true

  if (!isLoggedIn && isAuthenticatedRoute === true) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(`${request.nextUrl.origin}/`, 302)
  }

  if (!isAuthenticatedRoute && isLoggedIn) {
    // For example: redirect authenticated users to the dashboard page if they try to access the login page
    return NextResponse.redirect(`${request.nextUrl.origin}/app/dashboard`, 302)
  }
}

export const config = {
  matcher: ['/login', '/app/:path*'],
}
