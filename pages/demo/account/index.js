import { LogoutForm } from 'components/forms/logout'

export const Account = () => {
  return <div>
    <h3>Account</h3>
    <LogoutForm submitButton={{variation: 'text'}} onSuccess={() => window.location.href = '/demo' } />
  </div>
}

Account.Layouts = ['DemoLayout']
export default Account
