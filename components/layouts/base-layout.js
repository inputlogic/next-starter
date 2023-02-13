import Link from 'next/link'
import { Notification } from 'components/notification/'
import { Modals } from 'components/modals'
import { ForgotPasswordModal } from 'components/modals/forgot-password-modal'
import { LoginModal } from 'components/modals/login-modal'
import { SignupModal } from 'components/modals/signup-modal'
import { useStore } from 'util/store'
import { useUser, useLogoutUserMutation } from 'hooks/use-user'

export const BaseLayout = ({ children }) => {
  const setModal = useStore((state) => state.setModal)
  const [user] = useUser()
  const logoutUserMutation = useLogoutUserMutation()

  return (
    <>
      <Modals
        modals={{
          ForgotPasswordModal,
          LoginModal,
          SignupModal,
        }}
      />
      <Notification />

      <h1>Next Starter</h1>

      <nav>
        <span>
          <Link href="/">Home</Link> |{' '}
        </span>
        {user && (
          <span>
            <Link href="/account">My Account</Link> |{' '}
          </span>
        )}
        {user?.isAdmin && (
          <span>
            <Link href="/admin">Admin</Link> |{' '}
          </span>
        )}
        {user && (
          <a href="#" onClick={() => logoutUserMutation.mutate()}>
            Logout ({user?.user?.email})
          </a>
        )}
        {!user && (
          <a href="#" onClick={() => setModal('LoginModal')}>
            Login
          </a>
        )}
      </nav>

      <br />

      {children}
    </>
  )
}

export default BaseLayout
