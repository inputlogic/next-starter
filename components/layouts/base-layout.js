import Link from 'next/link'
import { useRouter } from 'next/router'

import { Notification } from '@/components/notification'
import { Modals } from '@/components/modals'
import { LoginModal } from '@/components/modals/login-modal'
import { get } from '@/util/api'
import { useStore } from '@/util/store'

const BaseLayout = ({ user, children }) => {
  const router = useRouter()
  const logout = useStore((state) => state.logout)

  const handleLogout = async () => {
    await get('/api/logout') 
    console.log('after get')
    logout()
    console.log('after logout')
    // router.push('/')
    // console.log('after push')
  }

  return (
    <>
      <Modals
        modals={{
          LoginModal
        }}
      />
      <Notification />

      <h1>Next Starter</h1>

      <nav>
        <Link href='/'>Home</Link>&nbsp;|&nbsp;
        <Link href='/admin'>Admin</Link>&nbsp;|&nbsp;
        {user && <a href="#" onClick={handleLogout}>Logout</a>}
      </nav>

      <br />

      {children}
    </>
  )
}

export default BaseLayout
