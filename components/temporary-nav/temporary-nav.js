import { useRouter } from 'next/router'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useStore } from 'util/store'
import { useUserMutation } from 'hooks/useUserMutation'
import { useBasicSession } from 'hooks/session'

export const TemporaryNav = () => {
  const setModal = useStore((state) => state.setModal)
  const pathName = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()
  const {
    logoutSessionMutation,
    logoutSessionIsLoading,
    logoutSessionIsError,
    logoutSessionError,
  } = useUserMutation()

  const {
    data: basicSessionData,
    isLoading: basicSessionIsLoading,
    isError: basicSessionIsError,
    error: basicSessionError,
  } = useBasicSession()

  return (
    <nav>
      <ul>
        <li>
          <Link href="/stylesheet">Stylesheet</Link>
        </li>
        {basicSessionData && basicSessionData.isLoggedIn ? (
          <>
            <li>
              <Link href="#">Authed area</Link> |{' '}
            </li>
            <li>
              <button
                className="button-reset"
                onClick={() => {
                  logoutSessionMutation()
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : null}
        {basicSessionData && !basicSessionData.isLoggedIn ? (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <button
                className="button-reset"
                onClick={() => setModal('SignupModal')}
              >
                Signup
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  )
}
