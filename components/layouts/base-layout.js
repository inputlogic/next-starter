import Link from 'next/link'
import { useRouter } from 'next/router'

import { Notification } from '@/components/notification'
import { Modals } from '@/components/modals'
import { LoginModal } from '@/components/modals/login-modal'
import { SignupModal } from '@/components/modals/signup-modal'
import { get } from '@/util/api'
import { useStore } from '@/util/store'

const BaseLayout = ({ user, children }) => {
  const router = useRouter()
  const logout = useStore((state) => state.logout)
  const setModal = useStore((state) => state.setModal)

  const handleLogout = async () => {
    await get('/api/logout') 
    logout()
  }

  return (
    <>
      <Modals
        modals={{
          LoginModal,
          SignupModal
        }}
      />
      <Notification />

      <h1>Next Starter</h1>

      <nav>
        <span><Link href='/'>Home</Link> | </span>
        {user && <span><Link href='/account'>My Account</Link> | </span>}
        {user?.isAdmin && <span><Link href='/admin'>Admin</Link> | </span>}
        {user && <a href="#" onClick={handleLogout}>Logout ({user.email})</a>}
        {!user && <a href="#" onClick={() => setModal('LoginModal')}>Login</a>}
      </nav>

      <br />

      {children}
    </>
  )
}

export default BaseLayout
