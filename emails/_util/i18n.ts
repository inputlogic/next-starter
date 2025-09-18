import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translation files
import enEmail from '../../public/locales/en/email.json'
import frEmail from '../../public/locales/fr/email.json'

const resources: Resource = {
  en: {
    email: enEmail
  },
  fr: {
    email: frEmail
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
