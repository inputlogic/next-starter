import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Loading } from 'components/loading'
import { useUser } from 'hooks/use-user'

const userUrls = ['/account']

/**
 * This component is used to make sure a user does not end up
 * on a page they shouldn't be on.
 **/
export const AuthWrapper = ({ children }) => {
  const router = useRouter()
  const [user, { isLoading: userIsLoading }] = useUser()
  const pathIsUserOnly = userUrls.some((url) => {
    return router?.pathname?.startsWith(url)
  })

  useEffect(() => {
    if (pathIsUserOnly && !userIsLoading && !user) {
      router.push('/')
    }
  }, [pathIsUserOnly, router, userIsLoading, user])

  if (userIsLoading) {
    return <Loading />
  }

  if (pathIsUserOnly && !userIsLoading && !user) {
    return null
  }

  return children
}

