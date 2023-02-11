import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Loading from 'components/loading/'
import { useUser } from 'hooks/use-user'

export const requireAuth = (
  Component,
  redirectUrl = null,
  FallbackComponent
) => {
  return (props) => {
    const router = useRouter()
    const [
      user,
      {isLoading: userIsLoading, isError: userIsError, error: userError}
    ] = useUser()

    useEffect(() => {
      if (redirectUrl && !userIsLoading && user == null) {
        window.location.href = redirectUrl
      }
    }, [user, userIsLoading])

    if (userIsLoading || (redirectUrl && !user)) {
      return <p>Loading</p>
    }

    if (userIsError) {
      return <p>There has been an error, please try logging in again.</p>
    }

    if (!userIsLoading && !redirectUrl && !user) {
      if (!FallbackComponent) {
        return <p>You do not have access to this content, please login.</p>
      }
      return <FallbackComponent {...props} />
    }

    return <Component {...props} />
  }
}
