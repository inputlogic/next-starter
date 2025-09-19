import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'
import { Form, useForm, TextInput, SubmitButton } from 'components/form'
import { axiosClient } from 'util/axios-client'

interface ForgotPasswordStep1FormData extends Record<string, unknown> {
  email: string
}

interface ForgotPasswordStep1Props {
  onSuccess?: () => void
}

export const ForgotPasswordStep1 = ({onSuccess}: ForgotPasswordStep1Props) => {
  const methods = useForm<ForgotPasswordStep1FormData>({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required(),
      })
    ),
    onSubmit: async (data) => {
      await axiosClient.post('/public/user/forgot-password-step-1', data)
      onSuccess?.()
    }
  })
  return (
    <Form methods={methods as any}>
      <TextInput name='email' placeholder='email@example.com' />
      <SubmitButton>Send Reset Password Link</SubmitButton>
    </Form>
  )
}