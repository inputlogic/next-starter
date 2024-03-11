import React, { ReactNode } from 'react'
import Link from 'next/link'
import { Notification } from 'components/notification/'
import { Modals } from 'components/modals'
import { ForgotPasswordModal } from 'components/modals/forgot-password-modal'
import { LoginModal } from 'components/modals/login-modal'
import { SignupModal } from 'components/modals/signup-modal'
import { useStore } from 'util/store'

interface BaseLayoutProps {
  children: ReactNode
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const setModal = useStore((state) => state.setModal)

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
        {/* Uncomment and adapt the following code based on your authentication logic and state management.
        {user && (
          <span>
            <Link href="/account">My Account</Link> |{' '}
          </span>
        )}
        {user?.user?.isAdmin && (
          <span>
            <Link href="/admin">Admin</Link> |{' '}
          </span>
        )}
        {user?.user && (
          <a href="#" onClick={() => logoutUserMutation.mutate()}>
            Logout ({user?.user?.email})
          </a>
        )}
        {!user && (
          <a href="#" onClick={() => setModal('LoginModal')}>
            Login
          </a>
        )} */}
      </nav>

      <br />

      {children}
    </>
  )
}

export default BaseLayout
