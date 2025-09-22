'use client'

import { useRouter } from 'next/navigation'
import { Signup as SignupForm } from 'components/forms/signup'

const SignupPage = () => {
  const router = useRouter()
  
  return (
    <>
      <h2>Signup</h2>
      <div style={{maxWidth: '20em'}}>
        <SignupForm onSuccess={() => router.push('/dev')} />
      </div>
    </>
  )
}

export default SignupPage
