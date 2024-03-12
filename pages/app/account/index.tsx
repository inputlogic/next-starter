import { useQuery } from '@tanstack/react-query'
import { getUser } from 'hooks/getUser'

const AccountIndex = () => {
  const {
    data: userProfile,
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
  } = useQuery({ queryKey: ['userProfile'], queryFn: getUser })

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
