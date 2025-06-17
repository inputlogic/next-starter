import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions } from 'util/server-only/iron-session'

const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'

export async function middleware(request) {
  if (isMaintenanceMode) return NextResponse.redirect(`${request.nextUrl.origin}/maintenance`)
  const authenticatedRoutes = ['/dashboard', '/settings']
  const unauthenticatedRoutes = ['/login']
  const session = await getIronSession(await cookies(), sessionOptions)
  const token = session.token
  const nextUrlPathname = request.nextUrl.pathname
  const isAuthenticatedRoute = authenticatedRoutes.includes(nextUrlPathname)
  const isUnauthenticatedRoute = unauthenticatedRoutes.includes(nextUrlPathname)
  const isLoggedIn = Boolean(token)

  if (isAuthenticatedRoute && !isLoggedIn) {
    return NextResponse.redirect(`${request.nextUrl.origin}/`, 302)
  }

  if (isUnauthenticatedRoute && isLoggedIn) {
    return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`, 302)
  }
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|maintenance).*)',
  ]
}
