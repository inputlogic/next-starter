import { buildLayout } from 'util/layout'

import 'styles/index.scss'

function App({ Component, pageProps }) {
  let ValidComponent = Component
  return buildLayout(ValidComponent.Layouts || [], ValidComponent, {
    ...pageProps,
  })
}

export default App
