import axios from 'axios'

// Security: Set max content length to prevent DoS attacks
const MAX_CONTENT_LENGTH = 50 * 1024 * 1024 // 50MB limit
const MAX_BODY_LENGTH = 50 * 1024 * 1024 // 50MB limit

export const axiosClient = axios.create({
  baseURL: '/api',
  headers: {'Content-Type': 'application/json'},
  maxContentLength: MAX_CONTENT_LENGTH,
  maxBodyLength: MAX_BODY_LENGTH,
  maxRedirects: 5, // Limit redirects to prevent infinite loops
  timeout: 30000, // 30 seconds timeout
})