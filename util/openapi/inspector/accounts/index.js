import { useState } from 'react'
import { Dialog } from 'util/openapi/inspector/dialog'

const AddAccount = ({
  openapi,
  accounts,
  setAccounts,
  loginFormName,
  loginFormMethod,
}) => {
  const [addAccountOpen, setAddAccountOpen] = useState(false)
  const loginMutation = openapi.mutations.usePublicUserLoginMutation()
  const LoginForm = openapi.useForm(loginFormName, loginFormMethod)
  const Fields = LoginForm.Fields
  const onSubmit = async ({ email, password }) => {
    const response = await loginMutation.mutateAsync({ email, password })
    const updatedAccounts = [...accounts, { email, token: response.token }]
    setAccounts(updatedAccounts)
    setAddAccountOpen(false)
  }
  return (
    <Dialog
      trigger={<button>Add Account</button>}
      open={addAccountOpen}
      onOpenChange={setAddAccountOpen}
    >
      <LoginForm.Form onSubmit={onSubmit}>
        <Fields.Email />
        <Fields.Password />
        <LoginForm.SubmitButton>Add Account</LoginForm.SubmitButton>
      </LoginForm.Form>
    </Dialog>
  )
}

export const Accounts = ({
  accounts,
  setAccounts,
  openapi,
  loginFormName,
  loginFormMethod,
}) => {
  const onClickRemove = (account) => {
    const updatedAccounts = accounts.filter((a) => a.email != account.email)
    setAccounts(updatedAccounts)
    localStorage.setItem('openapiAccounts', JSON.stringify(updatedAccounts))
  }
  const onClickSetActive = (account) => {
    const updatedAccounts = accounts.map(({ email, ...rest }) => ({
      ...rest,
      email,
      isActive: account.email === email,
    }))
    setAccounts(updatedAccounts)
  }
  return (
    <div>
      <div>
        <div>
          <div>
            Not authenticated{' '}
            {!accounts.find((a) => a.isActive) ? ' (active)' : ''}
          </div>
          <div>
            <button onClick={() => onClickSetActive({ email: '-' })}>
              set active
            </button>
          </div>
        </div>
        {accounts?.length > 0 &&
          accounts.map((account) => (
            <div key={account.email}>
              <div>
                {account.email} {account.isActive && ' (active)'}
              </div>
              <button onClick={() => onClickRemove(account)}>remove</button>
              <button onClick={() => onClickSetActive(account)}>
                set active
              </button>
            </div>
          ))}
      </div>
      {openapi && (
        <AddAccount
          openapi={openapi}
          setAccounts={setAccounts}
          accounts={accounts}
          loginFormName={loginFormName}
          loginFormMethod={loginFormMethod}
        />
      )}
    </div>
  )
}
