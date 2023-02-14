module.exports = {
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

  eslint: {
    ignoreDuringBuilds: true,
  },
}
