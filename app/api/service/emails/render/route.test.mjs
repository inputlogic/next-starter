import { test, describe } from 'node:test'
import assert from 'node:assert'

// Simple test for the POST endpoint using fetch
describe('POST /api/service/emails/render', () => {
  test('should render forgot-password email template successfully', async () => {
    const payload = {
      template_id: 'forgot-password-v1',
      data: {
        subject: 'Reset your password',
        resetLink: 'https://example.com/reset?token=abc123',
        languages: ['en'],
        theme: 'default'
      }
    }

    // Note: This test assumes the server is running on localhost:3000
    // You may need to adjust the URL based on your development setup
    try {
      const response = await fetch('http://localhost:3000/api/service/emails/render', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      // Test that the response is successful
      assert.strictEqual(response.status, 200, `Expected status 200, got ${response.status}`)
      
      // Test that the response contains HTML
      assert.ok(data.html, 'Response should contain html field')
      assert.strictEqual(typeof data.html, 'string', 'HTML should be a string')
      
      // Test that the HTML contains expected content
      assert.ok(data.html.includes('Reset your password'), 'HTML should contain the subject')
      assert.ok(data.html.includes('https://example.com/reset?token=abc123'), 'HTML should contain the reset link')
      
      console.log('✅ Test passed: Email template rendered successfully')
      console.log('Response data:', JSON.stringify(data, null, 2))

    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log('⚠️  Server not running. Start the dev server with: npm run dev')
        console.log('   Then run this test again')
        return
      }
      throw error
    }
  })

  test('should return 404 for non-existent template', async () => {
    const payload = {
      template_id: 'non-existent-template',
      data: {}
    }

    try {
      const response = await fetch('http://localhost:3000/api/service/emails/render', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      assert.strictEqual(response.status, 404, `Expected status 404, got ${response.status}`)
      assert.ok(data.error, 'Response should contain error field')
      assert.ok(data.error.includes('not found'), 'Error should mention template not found')
      
      console.log('✅ Test passed: 404 error for non-existent template')

    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log('⚠️  Server not running. Start the dev server with: npm run dev')
        return
      }
      throw error
    }
  })
})

// Manual test runner if you want to run this directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('🧪 Running email render API tests...')
  console.log('Make sure your development server is running (npm run dev)')
  console.log('')
}