import { useRouter } from 'next/router'
import { loginSession } from '/hooks/session'
import { Form, useForm, TextInput, SubmitButton } from '/components/form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'

const LoginForm = () => {
  const router = useRouter()
  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required(),
        password: y.string().required(),
      })
    ),
    onSubmit: async data => { 
      await loginSession(data)
      router.push('/dashboard')
    },
  })
  return (
    <Form methods={methods}>
      <TextInput name='email' type='email' />
      <TextInput name='password' type='password' />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}

const LoginPage = () => {
  return (
    <>
      <h2>Login</h2>
      <LoginForm />
    </>
  )
}

LoginPage.Layouts = ['BaseLayout']
export default LoginPage
