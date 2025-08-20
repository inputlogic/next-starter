import { NextRequest } from 'next/server'
import { POST } from './route'

// Mock the dependencies
jest.mock('@react-email/render', () => ({
  render: jest.fn()
}))

jest.mock('emails', () => ({
  ForgotPassword: {
    definition: {
      name: 'Forgot Password',
      version: 'forgot-password-v1',
      schema: {
        type: 'object',
        required: ['resetLink'],
        properties: {
          subject: { type: 'string', default: 'Reset your password' },
          resetLink: { type: 'string', format: 'uri', default: 'https://example.com/reset' },
          languages: { type: 'array', items: { type: 'string' }, default: ['en'] },
          theme: { type: 'string', default: 'default' }
        }
      }
    }
  }
}))

jest.mock('emails/utils/validation', () => ({
  ValidationError: class ValidationError extends Error {
    constructor(message, data) {
      super(message)
      this.data = data
    }
  },
  ValidatedEmail: jest.fn((Component) => Component)
}))

jest.mock('util/server-only/email-service', () => ({
  checkEmailServiceAuth: jest.fn(() => null) // Return null for successful auth
}))

describe('/api/service/emails/render', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render forgot-password email template successfully', async () => {
    const { render } = require('@react-email/render')
    render.mockResolvedValue('<html>Rendered email content</html>')

    const requestBody = {
      template_id: 'forgot-password-v1',
      data: {
        subject: 'Reset your password',
        resetLink: 'https://example.com/reset?token=abc123',
        languages: ['en'],
        theme: 'default'
      }
    }

    const request = new NextRequest('http://localhost:3000/api/service/emails/render', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(200)
    expect(responseData).toEqual({
      html: '<html>Rendered email content</html>'
    })
    expect(render).toHaveBeenCalledTimes(1)
  })

  it('should return 404 for non-existent template', async () => {
    const requestBody = {
      template_id: 'non-existent-template',
      data: {}
    }

    const request = new NextRequest('http://localhost:3000/api/service/emails/render', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(404)
    expect(responseData).toEqual({
      error: 'Email template "non-existent-template" not found'
    })
  })

  it('should handle validation errors', async () => {
    const { render } = require('@react-email/render')
    const { ValidationError } = require('emails/utils/validation')
    
    render.mockRejectedValue(new ValidationError('Invalid data', { field: 'resetLink' }))

    const requestBody = {
      template_id: 'forgot-password-v1',
      data: {
        resetLink: 'invalid-url'
      }
    }

    const request = new NextRequest('http://localhost:3000/api/service/emails/render', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData).toEqual({
      error: 'Invalid data',
      data: { field: 'resetLink' }
    })
  })

  it('should handle authentication errors', async () => {
    const { checkEmailServiceAuth } = require('util/server-only/email-service')
    const authErrorResponse = new Response('Unauthorized', { status: 401 })
    checkEmailServiceAuth.mockReturnValue(authErrorResponse)

    const requestBody = {
      template_id: 'forgot-password-v1',
      data: {}
    }

    const request = new NextRequest('http://localhost:3000/api/service/emails/render', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    const response = await POST(request)
    
    expect(response.status).toBe(401)
  })

  it('should handle malformed JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/service/emails/render', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json'
    })

    const response = await POST(request)
    const responseData = await response.json()

    expect(response.status).toBe(400)
    expect(responseData.error).toBeDefined()
  })
})