const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = withReactSvg({
  outputFileTracing: true,
  include: path.resolve(__dirname, 'public/images/svg'),
  webpack(config, options) {
    return config
  },
  env: {
    SESSION_SECRET: process.env.SESSION_SECRET,
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'https://localhost:3000',
  },
  // images: {
  //   domains: [process.env.NEXT_PUBLIC_IMAGE_HOST],
  // },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
})
