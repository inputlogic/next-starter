import settings from '@/util/settings'

export function url(pathName, args={}) {
  let u = urls[pathName]
  for (const [k, v] of Object.entries(args)) {
    u = u.replace(`:${k}`, v)
  }
  return u
}

export function apiUrl(pathName) {
  return settings.apiUrl + apiUrls[pathName]
}

/**
 * URLs related to the NextJS app/browser interface.
 */
const urls = {
  // Public routes
  index: '/'
}

/**
 * URLs specific to the API; the host is determined by environment in settings.js
 */
const apiUrls = {
  authFacebook: '/facebook',
  me: '/me',
}
