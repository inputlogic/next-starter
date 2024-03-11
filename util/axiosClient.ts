import axios from 'axios'
import { getSession } from 'hooks/session'

const axiosClient = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  async function (config) {
    if (config.url) {
      // Extract the path from config.url, accounting for both absolute and relative URLs
      const urlPath = new URL(config.url, process.env.API_URL).pathname
      console.log('urlPath', urlPath)

      if (!urlPath.startsWith('/public')) {
        console.log('starts with /public', urlPath)

        const sessionData = await getSession()
        const authToken = sessionData.token

        // Set the Authorization header for the request
        config.headers['Authorization'] = `Token ${authToken}`
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosClient
