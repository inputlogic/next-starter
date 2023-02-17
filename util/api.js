import { apiUrl } from 'util/urls'

/**
 * Utility function for making a GET request.
 *
 * returns a standard fetch promise or throws a normalized error
 **/
export const get = (url, payload = {}) => {
  payload['method'] = 'GET'
  return _fetch(url, payload)
}

/**
 * Utility function for making a OPTIONS request.
 *
 * returns a standard fetch promise or throws a normalized error
 **/
export const options = (url, payload = {}) => {
  payload['method'] = 'OPTIONS'
  return _fetch(url, payload)
}

/**
 * Utility function for making a JSON POST request. The `data` argument should be a standard
 * object that is JSON serializable.
 *
 * returns a standard fetch promise or throws a normalized error
 **/
export const post = (url, data = {}, payload = {}) => {
  payload['method'] = 'POST'
  payload['body'] = data
  return _fetch(url, payload)
}

/**
 * Same as `post` but as PUT
 **/
export const put = (url, data = {}, payload = {}) => {
  payload['method'] = 'PUT'
  payload['body'] = data
  return _fetch(url, payload)
}

/**
 * Same as `post` but as PATCH
 **/
export const patch = (url, data = {}, payload = {}) => {
  payload['method'] = 'PATCH'
  payload['body'] = data
  return _fetch(url, payload)
}

/**
 * Gets a signed S3 file url from Django API for direct S3 file uploads.
 **/
export const getSignedFile = async (file, token) => {
  const resp = await post('files', {
    token,
    data: {
      file_name: file.name,
      content_type: file.type,
    },
  })
  return resp
}

export const uploadFile = async (file, token) => {
  const { url, s3_data } = await getSignedFile(file, token)
  let data = new FormData()
  for (const [k, v] of Object.entries(s3_data.fields)) {
    data.append(k, v)
  }
  data.append('file', file)

  try {
    const resp = await fetch(s3_data.url, {
      method: 'POST',
      body: data,
    })
  } catch (err) {
    console.warn('Failed to upload file:', err)
  }

  return url
}

/**
 * Wrapper to fetch to normalize how we make and receive requests.
 **/
async function _fetch(url, payload = {}) {
  // If url starts with a slash, we're hitting NextJS's local api (and must use full url)
  // Otherwise, if there is no http defined, assume named api url (see /util/urls.js)
  if (url.startsWith('/')) {
    if (window.nextServerUrl) {
      // This is for storybook
      url = window.nextServerUrl + url
    } else {
      url = window.location.protocol + '//' + window.location.host + url
    }
  } else if (url.indexOf('http') < 0) url = apiUrl(url, payload.args)

  // Remove params from payload and add to url
  if (payload.params) {
    url += '?' + new URLSearchParams(payload.params)
    delete payload.params
  }

  // If no headers given, assume json request
  if (!payload.headers) {
    payload['headers'] = { 'Content-Type': 'application/json' }
  }

  // If auth is required, use authToken from store
  if (payload.token) {
    payload.headers['Authorization'] = `Token ${payload.token}`
    delete payload.token
  }

  // Ensure body is JSONified
  if (payload.body && typeof payload.body === 'object') {
    payload.body = JSON.stringify(payload.body)
  }

  console.log(`${payload.method}: ${url}`)
  console.log(payload)

  try {
    const resp = await fetch(url, payload)
    const result = await resp.json()
    if (![200, 201, 203, 204].includes(resp.status)) {
      throw {
        code: resp.status,
        message: resp.status + ' ' + resp.statusText,
        data: result,
      }
    } else {
      return result
    }
  } catch (error) {
    if (error.code) throw error
    throw {
      code: 500,
      message: error,
    }
  }
}
