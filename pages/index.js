import Head from 'next/head'
import { useStore } from 'util/store'
import { Loading } from 'components/loading'
import { Placeholder } from 'components/placeholder'
import { useQuery } from '@tanstack/react-query'
import { getUser } from 'hooks/getUser'

const Index = () => {
  const setModal = useStore((state) => state.setModal)
  const setNotification = useStore((state) => state.setNotification)

  const {
    data: userProfile,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
  } = useQuery({ queryKey: ['userProfile'], getUser })

  return (
    <>
      <Head>
        <title>Next Starter</title>
      </Head>
      <h2>Home</h2>
      {userIsLoading && <Loading />}
      {userProfile && !userIsLoading && <p>Hello {userProfile?.firstName}</p>}
      {userProfile && !userIsLoading ? (
        <>
          {/* <button onClick={() => logoutUserMutation.mutate()}>Logout</button> */}
        </>
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
      <Placeholder name="Home" />
    </>
  )
}

Index.Layouts = ['BaseLayout']
export default Index
