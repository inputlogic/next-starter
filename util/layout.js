import BaseLayout from '@/components/layouts/base-layout'
import AdminLayout from '@/components/layouts/admin-layout'

const LAYOUTS = {
  'BaseLayout': BaseLayout,
  'AdminLayout': AdminLayout,
}

export function buildLayout(layouts, Component, pageProps) {
  const Layout = LAYOUTS[layouts[0]]

  if (layouts.length > 0) {
    return (
      <Layout {...pageProps}>
        {buildLayout(layouts.slice(1), Component, pageProps)}
      </Layout>
    )
  }

  return <Component {...pageProps} /> 
}
