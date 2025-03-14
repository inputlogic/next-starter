'use client'

import { useRouter } from 'next/navigation'
import { Login as LoginForm } from 'components/forms/login'

const LoginPage = () => {
  const router = useRouter()
  
  return (
    <>
      <h2>Login</h2>
      <div style={{maxWidth: '20em'}}>
        <LoginForm onSuccess={() => router.push('/dev')} />
      </div>
    </>
  )
}

export default LoginPage
