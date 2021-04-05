import settings from '@/util/settings'

/**
 * Generates a Facebook auth url based on client id, redirect url and scope defined in settings.
 */
export function getFbAuthUrl() {
  const url = settings.fbAuthUrl + '?' + new URLSearchParams({
    client_id: settings.fbClientId,
    redirect_uri: settings.fbRedirectUrl,
    scope: settings.fbAuthScope
  })
  return url
}

/**
 * Takes an age (int) and returns the year, using todays month and day in ISO format:
 * ie: YYYY-MMM-DD
 **/
export function ageToISO(age) {
  const d = new Date()
  d.setFullYear(d.getFullYear() - age)
  return d.toISOString().split('T')[0]
}
