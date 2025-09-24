import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'
import { Form, useForm, TextInput, SubmitButton } from 'components/form'
import { queryClient } from 'util/query-client'
import { axiosClient } from 'util/axios-client'

interface LoginFormData {
  email: string
  password: string
  [key: string]: any
}

interface LoginProps {
  onSuccess?: () => void
}

export const Login = ({onSuccess}: LoginProps) => {
  const methods = useForm<LoginFormData>({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required(),
        password: y.string().required(),
      })
    ) as any,
    onSubmit: async (data) => {
      await axiosClient.post('/public/user/login', data)
      queryClient.resetQueries({
        predicate: query => !!query.queryKey[0]?.toString().includes('is-logged-in')
      })
      onSuccess?.()
    }
  })
  return (
    <Form methods={methods as any}>
      <TextInput type='email' name='email' placeholder='email@example.com' />
      <TextInput
        name='password'
        type='password'
        placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
      />
      <SubmitButton>Log in</SubmitButton>
    </Form>
  )
}