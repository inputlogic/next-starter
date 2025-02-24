'use client'

import { LogoutForm } from 'components/forms/logout'
import { useQuery } from 'hooks/use-query'

const Account = () => {
  const query = useQuery({url: '/user/my-profile'})
  return <div>
    <h3>Account</h3>
    {query.isLoading && <div>Loading...</div>}
    {query.isSuccess && <div>
      You are logged in as {query.data.email}
    </div>}
    <LogoutForm submitButton={{variation: 'text'}} onSuccess={() => window.location.href = '/demo' } />
  </div>
}

export default Account
