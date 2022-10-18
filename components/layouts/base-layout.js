import Link from 'next/link'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Notification } from 'components/notification/'
import { Modals } from 'components/modals'
import { Header } from 'components/header'
import { get } from 'util/api'
import { useStore } from 'util/store'
import { useUser } from 'hooks/use-user'
import SvgDef from 'public/images/svg-spritesheet/spritesheet.svg'

const BaseLayout = ({ children }) => {
  const setModal = useStore((state) => state.setModal)
  const { user, logoutUser } = useUser()

  useEffect(() => {
    console.log('user in layout', user)
  }, [user])

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Modals modals={{}} />
      <Notification />
      <div className="app">
        <Header />
        <main className="main">{children}</main>
      </div>
      <SvgDef />
    </>
  )
}

export default BaseLayout
