import { BaseLayout } from './base-layout'

const LAYOUTS = { BaseLayout }

export const Layouts = ({ layouts, children, pageProps }) => {
  console.log('layouts', layouts)
  if (layouts.length > 0) {
    const Layout = LAYOUTS[layouts[0]]
    if (!Layout) {
      console.warn('Missing layout', layouts[0])
      return (
        <Layouts layouts={layouts.slice(1)} pageProps={pageProps}>
          {children}
        </Layouts>
      )
    }
    return (
      <Layout {...pageProps}>
        <Layouts layouts={layouts.slice(1)} pageProps={pageProps}>
          {children}
        </Layouts>
      </Layout>
    )
  }
  return children
}
