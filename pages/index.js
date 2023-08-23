import Head from 'next/head'
import { useUser, useLogoutUserMutation } from 'hooks/use-user'
import { useStore } from 'util/store'
import { FetchingIndicator } from 'components/loading'
import { OpenAPIForm } from 'components/openapi-form'

const Index = () => {
  const setModal = useStore((state) => state.setModal)
  const setNotification = useStore((state) => state.setNotification)
  const [
    user,
    {
      isLoading: userIsLoading,
      isError: userIsError,
      isFetching: userIsFetching,
    },
  ] = useUser()
  const logoutUserMutation = useLogoutUserMutation()

  return (
    <>
      <Head>
        <title>Next Starter</title>
      </Head>
      <h2>Home</h2>
      <OpenAPIForm />
      {userIsFetching && <FetchingIndicator text="Refreshing" />}
      {user && !userIsLoading && <p>Hello {user?.user?.email}</p>}
      {user && !userIsLoading ? (
        <button onClick={() => logoutUserMutation.mutate()}>Logout</button>
      ) : (
        <button onClick={() => setModal('SignupModal')}>Signup</button>
      )}
      <button
        onClick={() =>
          setNotification({
            type: 'success',
            text: 'This is a notification',
            duration: 2000,
          })
        }
      >
        Show Notification
      </button>
    </>
  )
}

Index.Layouts = ['BaseLayout']
export default Index
