import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions } from 'util/server-only/iron-session'

export async function middleware(request) {
  const authenticatedRoutes = ['/dashboard', '/settings']
  const unauthenticatedRoutes = ['/login']
  const adminRoutes = ['/admin']
  const adminLoginPath = '/admin/login'
  const session = await getIronSession(cookies(), sessionOptions)
  const token = session.token
  const isAdmin = session.isAdmin
  const nextUrlPathname = request.nextUrl.pathname
  const isAuthenticatedRoute = authenticatedRoutes.includes(nextUrlPathname)
  const isUnauthenticatedRoute = unauthenticatedRoutes.includes(nextUrlPathname)
  const isAdminRoute = adminRoutes.some(route => nextUrlPathname.startsWith(route))
  const isAdminLoginPage = nextUrlPathname === adminLoginPath
  const isLoggedIn = Boolean(token)

  if (isAuthenticatedRoute && !isLoggedIn) {
    return NextResponse.redirect(`${request.nextUrl.origin}/`, 302)
  }

  if (isUnauthenticatedRoute && isLoggedIn) {
    return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`, 302)
  }

  // Allow access to admin login page for everyone
  if (isAdminLoginPage) {
    return NextResponse.next()
  }

  // Restrict access to admin routes for non-admin users
  if (isAdminRoute && (!isLoggedIn || !isAdmin)) {
    // Include the original path as 'next' query parameter
    const url = new URL(adminLoginPath, request.nextUrl.origin)
    url.searchParams.set('next', nextUrlPathname)
    return NextResponse.redirect(url, 302)
  }
}

export const config = {
  matcher: [
    // '/login',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
