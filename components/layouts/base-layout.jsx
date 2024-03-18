import React from 'react'
import Link from 'next/link'
import { Notification } from 'components/notification/'
import { Modals } from 'components/modals'
import { ForgotPasswordModal } from 'components/modals/forgot-password-modal'
import { LoginModal } from 'components/modals/login-modal'
import { SignupModal } from 'components/modals/signup-modal'
import { useStore } from 'util/store'
import { usePathname } from 'next/navigation'
import { logoutSession, useBasicSession } from 'hooks/session'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const BaseLayout = ({ children }) => {
  const setModal = useStore((state) => state.setModal)
  const pathName = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    mutate: logoutSessionMutation,
    isLoading,
    isError,
    error,
  } = useMutation({
    queryKey: ['logout'],
    mutationFn: logoutSession,
    onSuccess: (data) => {
      console.log('Logout successful', data)
      queryClient.invalidateQueries('basicSession')
      router.push('/')
    },
    onError: (error) => {
      console.error('Logout error', error)
    },
  })

  const {
    data: basicSessionData,
    isLoading: basicSessionIsLoading,
    isError: basicSessionIsError,
    error: basicSessionError,
  } = useBasicSession()

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
            <a href="#" onClick={() => logoutSessionMutation()}>
              Logout
            </a>
          </>
        )}

        {pathName === '/' && (
          <>
            {basicSessionData && basicSessionData.isLoggedIn && (
              <>
                <span>
                  <Link href="/app/dashboard">Dashboard</Link> |{' '}
                </span>
                <span>
                  <Link href="/app/account">My Account</Link> |{' '}
                </span>
                <a
                  href="#"
                  onClick={() => {
                    logoutSessionMutation()
                  }}
                >
                  Logout
                </a>
              </>
            )}
            {basicSessionData && !basicSessionData.isLoggedIn && (
              <>
                <a href="#" onClick={() => setModal('LoginModal')}>
                  Login
                </a>
                <a href="#" onClick={() => setModal('SignupModal')}>
                  Signup
                </a>
              </>
            )}
          </>
        )}
      </nav>

      <br />

      {children}
    </>
  )
}
