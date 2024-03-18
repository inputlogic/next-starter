import { useGetUser } from 'hooks/getUser'

const AccountIndex = () => {
  const {
    data: userProfile,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
  } = useGetUser()
  return (
    <>
      <h2>My Account</h2>
      {userIsLoading ? <p>Loading...</p> : null}
      {userIsError ? <p>Error: {userError.message}</p> : null}
      {userProfile && !userIsLoading && (
        <p>
          id:{userProfile.id} {userProfile.email}
        </p>
      )}
      <p>
        You should see this page if you're logged in as a regular user or admin.
      </p>
    </>
  )
}

AccountIndex.Layouts = ['BaseLayout']
export default AccountIndex
