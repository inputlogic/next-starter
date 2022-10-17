import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Notification } from 'components/notification/'
import { Modals } from 'components/modals'
import { Header } from 'components/header'
import { get } from 'util/api'
import { useStore } from 'util/store'
import { useUser } from 'hooks/use-user'

const BaseLayout = ({ children }) => {
  const setModal = useStore((state) => state.setModal)
  const { user, logoutUser } = useUser()

  useEffect(() => {
    console.log('user in layout', user)
  }, [user])

  return (
    <>
      <Modals modals={{}} />
      <Notification />
      <div className="app">
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}

export default BaseLayout
