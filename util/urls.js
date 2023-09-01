import settings from 'util/settings'

export function url(pathName, args = {}) {
  let u = urls[pathName]
  for (const [k, v] of Object.entries(args)) {
    u = u.replace(`:${k}`, v)
  }
  return u
}

export const apiUrl = (pathName, args = {}) => {
  let u = settings.apiUrl + apiUrls[pathName]
  for (const [k, v] of Object.entries(args)) {
    u = u.replace(`:${k}`, v)
  }
  return u
}

/**
 * URLs related to the NextJS app/browser interface.
 */
const urls = {
  // Public routes
  index: '/',
}

/**
 * URLs specific to the API; the host is determined by environment in settings.js
 */
const apiUrls = {
  login: '/public/user/login',
  signup: '/auth/signup',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  me: '/user/my-profile',
  // myProfile: '/user/my-profile',
}

/**
 * Protected URLS that are gated by auth
 */
export const protectedUrls = ['/account']
export const adminUrls = ['/admin']
