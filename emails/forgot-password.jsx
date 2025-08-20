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
  version: 'forgot-password-v1',
  schema: {
    type: 'object',
    required: ['resetLink'],
    properties: {
      subject: {
        type: 'string',
        default: 'Reset your password',
      },
      resetLink: {
        type: 'string',
        format: 'uri',
        default: 'https://example.com/reset',
      },
      languages: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['en', 'es', 'fr'],
        },
        default: ['en'],
      },
      theme: {
        type: 'string',
        enum: ['default', 'dark', 'minimal'],
        default: 'default',
      },
    },
  },
}

const schema = {
  type: 'object',
  required: ['resetLink'],
  properties: {
    subject: {
      type: 'string',
      default: 'Reset your password',
    },
    resetLink: {
      type: 'string',
      format: 'uri',
      default: 'https://example.com/reset',
    },
    languages: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['en', 'es', 'fr'],
      },
      default: ['en'],
    },
    theme: {
      type: 'string',
      enum: ['default', 'dark', 'minimal'],
      default: 'default',
    },
  },
}

export const ForgotPassword = ({
  subject = schema.properties.subject.default,
  resetLink = schema.properties.resetLink.default,
  languages = schema.properties.languages.default,
  theme = schema.properties.theme.default,
}) => {
  return (
    <Html>
      <Head />
      <Body
        style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4' }}
      >
        <Container style={container}>
          <Heading style={heading}>{subject}</Heading>
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
