import { NextResponse } from 'next/server'
import { getToken } from 'util/server-only/cookies'

const API_URL = process.env.API_URL

if (!API_URL) {
  console.warn('API_URL environment variable missing')
} else if (API_URL.endsWith('/api')) {
  console.warn('Environment variable API_URL should not include /api at the end')
}

// This function forwards requests to the backend API
async function proxyRequest(req) {
  const token = await getToken()
  const url = new URL(req.url)
  const path = url.pathname
  
  // Get request body if it exists
  let body = null
  try {
    body = await req.text()
    // Only parse as JSON if it exists and is valid JSON
    if (body) {
      body = JSON.parse(body)
    }
  } catch (error) {
    // If it's not valid JSON, keep it as text
    console.log('Error parsing request body:', error)
  }
  
  // Prepare headers
  const headers = new Headers()
  req.headers.forEach((value, key) => {
    // Skip host header to avoid conflicts
    if (key !== 'host') {
      headers.set(key, value)
    }
  })
  
  // Add authorization if token exists
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  
  // Create target URL
  const targetUrl = `${API_URL}${path}`
  console.log('-', req.method, targetUrl)
  
  try {
    // Forward the request
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      redirect: 'follow',
    })
    
    // Get response data
    const responseData = await response.text()
    const responseHeaders = new Headers(response.headers)
    
    // Create and return NextResponse
    return new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    })
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}

export async function GET(req) {
  return proxyRequest(req)
}

export async function POST(req) {
  return proxyRequest(req)
}

export async function PUT(req) {
  return proxyRequest(req)
}

export async function DELETE(req) {
  return proxyRequest(req)
}

export async function PATCH(req) {
  return proxyRequest(req)
}
