/**
 * Utility function for making a GET request.
 *
 * returns a standard fetch promise or throws a normalized error
 **/
export const get = (url, options={}) => {
  if(options.params) url += '?' + new URLSearchParams(options.params)
  return _fetch(url, 'GET', options)
}

/**
 * Utility function for making a JSON POST request. The `data` argument should be a standard
 * object that is JSON serializable.
 *
 * returns a standard fetch promise or throws a normalized error
 **/
export const post = (url, data, options={}) => {
  options['data'] = data
  return _fetch(url, 'POST', options)
}

/**
 * Same as `post` but as PUT
 **/
export const put = (url, data, options={}) => {
  options['data'] = data
  return _fetch(url, 'PUT', options)
}

/**
 * Same as `post` but as PATCH
 **/
export const patch = (url, data, options={}) => {
  options['data'] = data
  return _fetch(url, 'PATCH', options)
}

/**
 * Wrapper to fetch to normalize how we make and receive requests.
 **/
function _fetch(url, method, options) {
  console.log(`${method}: ${url}`)
  let result
  let request = {method}
  let headers = {'Content-Type': 'application/json'}

  if (options.headers) headers = Object.assign(headers, options.headers)
  if (options.token) headers['Authorization'] = `Token ${options.token}`
  if (options.data) request['body'] = JSON.stringify(options.data)

  request['headers'] = headers

  return fetch(url, request)
    .then(res => {
      result = res // Need to set response so we can access further down the chain
      return res.json()
    })
    .then(data => {
      if(![200, 201, 203, 204].includes(result.status)) {
        throw({
          code: result.status, 
          message: result.status+' '+result.statusText,
          data
        })
      }
      return data
    })
    .catch(error => {
      if(error.code) throw (error)
      throw({
        code: 500,
        message: error
      })
    })
  }
