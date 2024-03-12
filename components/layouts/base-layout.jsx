import React from 'react'
import Link from 'next/link'
import { Notification } from 'components/notification/'
import { Modals } from 'components/modals'
import { ForgotPasswordModal } from 'components/modals/forgot-password-modal'
import { LoginModal } from 'components/modals/login-modal'
import { SignupModal } from 'components/modals/signup-modal'
import { useStore } from 'util/store'
import { usePathname } from 'next/navigation'

export const BaseLayout = ({ children }) => {
  const setModal = useStore((state) => state.setModal)
  const pathName = usePathname()

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
        {pathName.startsWith('/app') && (
          <>
            <span>
              <Link href="/app/dashboard">Dashboard</Link> |{' '}
            </span>
            <span>
              <Link href="/app/account">My Account</Link> |{' '}
            </span>
            {/* <a href="#" onClick={() => logoutUserMutation.mutate()}>
              Logout
            </a> */}
          </>
        )}

        {pathName === '/' && (
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
