import axios from 'axios'
import { getSession } from 'hooks/session'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  async function (config) {
    // Before sending the request, this function checks if the request URL does not start with '/public'.
    // If so, it retrieves the session data to add an Authorization header with the token to the request.

    if (config.url) {
      console.log('config.url', config.url)
      // Extract the path from config.url, accounting for both absolute and relative URLs
      const urlPath = new URL(config.url, process.env.NEXT_PUBLIC_API_URL)
        .pathname
      console.log('urlPath', urlPath)

      if (!config.url.startsWith('/public')) {
        console.log('Adding token to request')
        const sessionData = await getSession()
        const authToken = sessionData.token

        // Set the Authorization header for the request
        config.headers['Authorization'] = `Token ${authToken}`
      }
    }
    return config
  },
  function (error) {
    // If an error occurs before the request is sent (e.g., during configuration),
    // this function allows the error to be forwarded to the promise's .catch() handler.
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    // This function simply returns the response as is, without modification.
    // It's a placeholder for potentially transforming response data in the future.
    return response
  },
  (error) => {
    // This function catches any errors from the response.
    // Similar to the request interceptor, it forwards the error to be handled by .catch().
    return Promise.reject(error)
  }
)

export { axiosClient }
