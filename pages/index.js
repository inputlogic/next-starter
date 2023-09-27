import Head from 'next/head'
import { useUser, useLogoutUserMutation } from 'hooks/use-user'
import { useStore } from 'util/store'
import { Loading } from 'components/loading'

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
      {userIsFetching && <Loading />}
      {user && !userIsLoading ? (
        <button onClick={() => logoutUserMutation.mutate()}>Logout</button>
      ) : (
        <button onClick={() => setModal('SignupModal')}>Signup</button>
      )}
    </>
  )
}

Index.Layouts = ['BaseLayout']
export default Index
