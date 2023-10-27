import { useState } from 'react'
import { Accounts } from './accounts'
import { FormInspector } from 'util/openapi/inspector/form-inspector'
import { useOpenapiToolkit } from 'util/openapi/use-openapi-toolkit'
import { config } from 'util/openapi/config'

export const Inspector = () => {
  const [accounts, setAccounts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('openapiAccounts')) || []
    } catch {
      return []
    }
  })
  const activeAccount = accounts.find((a) => a.isActive)
  const openapi = useOpenapiToolkit({
    openapiUrl: process.env.NEXT_PUBLIC_OPENAPI_URL,
    config: {
      ...config,
      useToken: () => activeAccount?.token,
    },
    cacheString: activeAccount?.email || '',
  })
  return (
    <div>
      <Accounts
        accounts={accounts}
        setAccounts={(accounts) => {
          setAccounts(accounts)
          localStorage.setItem('openapiAccounts', JSON.stringify(accounts))
        }}
        openapi={openapi}
        loginFormName="publicUserLogin"
        loginFormMethod="post"
      />
      {openapi && <FormInspector openapi={openapi} />}
    </div>
  )
}
