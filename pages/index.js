import Head from 'next/head'
import { useUser } from '@/hooks/use-user'
import { useStore } from 'util/store'
import { FetchingIndicator } from 'components/loading'
import { Stylesheet } from '@/components/stylesheet'

const Index = () => {
  const setModal = useStore((state) => state.setModal)
  const setNotification = useStore((state) => state.setNotification)
  const { user, userIsLoading, userIsError, logoutUser, userIsFetching } =
    useUser()

  return (
    <>
      <Head>
        <title>Replayz</title>
      </Head>
      <h2>Home</h2>
      <Stylesheet />
      {userIsFetching && <FetchingIndicator text="Refreshing" />}
      {user && !userIsLoading && <p>Hello {user?.user?.email}</p>}
      {user && !userIsLoading ? (
        <button onClick={() => logoutUser.mutate()}>Logout</button>
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
