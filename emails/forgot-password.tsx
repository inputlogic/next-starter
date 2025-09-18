import { Button, Html, Text, Container, Section, Head, Heading, Body } from '@react-email/components'
import { variables } from 'styles/variables'
import { useTranslation } from 'react-i18next'
import './_util/i18n'
import * as React from 'react'

interface ForgotPasswordProps {
  theme?: 'dark' | 'light'
  language?: string
  resetLink?: string
}

type VariablesType = {
  [key in 'dark' | 'light']: {
    [cssVar: string]: string
  }
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  theme = 'dark',
  language = 'fr',
  resetLink = 'http://example.com/reset'
}) => {
  const { t, i18n } = useTranslation('email')

  i18n.changeLanguage(language)

  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: (variables as VariablesType)[theme]['body-color'], color: (variables as VariablesType)[theme]['text-color'] }}>
        <Container style={container}>
          <Heading style={heading}>{t('forgot-password.heading')}</Heading>
          <Text style={text}>
            {t('forgot-password.body')}
          </Text>
          <Section style={buttonContainer}>
            <Button
              href={resetLink}
              style={button}
            >
              {t('forgot-password.button')}
            </Button>
          </Section>
          <Text style={text}>
            {t('forgot-password.disclaimer')}
          </Text>
          <Text style={footer}>
            {t('forgot-password.footer')}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
}

const heading: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
}

const text: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '20px',
}

const buttonContainer: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
}

const button: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '16px',
}

const footer: React.CSSProperties = {
  fontSize: '12px',
  color: '#666666',
  textAlign: 'center',
}

export default ForgotPassword
