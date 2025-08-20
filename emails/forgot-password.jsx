import {
  Button,
  Html,
  Text,
  Container,
  Section,
  Head,
  Heading,
  Body,
} from '@react-email/components'
import * as React from 'react'

const definition = {
  name: 'Forgot Password',
  description:
    'Sends a password reset link when a user submits forgot password form.',
  schema: {
    type: 'object',
    required: ['resetLink'],
    properties: {
      resetLink: {
        type: 'string',
        default: 'https://example.com/reset',
      },
    },
  },
}

const schema = {
  type: 'object',
  required: ['resetLink'],
  properties: {
    resetLink: {
      type: 'string',
      default: 'https://example.com/reset',
    },
  },
}

export const ForgotPassword = ({
  resetLink = schema.properties.resetLink.default,
}) => {
  return (
    <Html>
      <Head />
      <Body
        style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4' }}
      >
        <Container style={container}>
          <Heading style={heading}>Reset Your Password</Heading>
          <Text style={text}>
            We received a request to reset your password. Click the button below
            to set a new password:
          </Text>
          <Section style={buttonContainer}>
            <Button href={resetLink} style={button}>
              Reset Password
            </Button>
          </Section>
          <Text style={text}>
            If you didn't request a password reset, please ignore this email.
          </Text>
          <Text style={footer}>&copy; 2025 YourApp. All rights reserved.</Text>
        </Container>
      </Body>
    </Html>
  )
}

const container = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
}

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
}

const text = {
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '20px',
}

const buttonContainer = {
  textAlign: 'center',
  marginBottom: '20px',
}

const button = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '16px',
}

const footer = {
  fontSize: '12px',
  color: '#666666',
  textAlign: 'center',
}

ForgotPassword.schema = schema
ForgotPassword.definition = definition

export default ForgotPassword
