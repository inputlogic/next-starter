'use client'

import { redirect } from 'next/navigation'
import { Login as LoginForm } from 'components/forms/login'

const LoginPage = () => {
  return (
    <>
      <h2>Login</h2>
      <LoginForm onSuccess={() => redirect('/')} />
    </>
  )
}

export default LoginPage
