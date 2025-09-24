import { Form, useForm, SubmitButton } from 'components/form'
import { axiosClient } from 'util/axios-client'
import { queryClient } from 'util/query-client'

interface LogoutFormData extends Record<string, unknown> {
  // Empty - logout doesn't require form data
}

interface LogoutFormProps {
  onSuccess?: () => void
  submitButton?: Record<string, unknown>
  [key: string]: unknown
}

export const LogoutForm = ({onSuccess, submitButton = {}, ...props}: LogoutFormProps) => {
  const methods = useForm<LogoutFormData>({
    onSubmit: async (data) => {
      await axiosClient.post('/user/logout', data)
      queryClient.resetQueries({
        predicate: query => !!query.queryKey[0]?.toString().includes('is-logged-in')
      })
      onSuccess?.()
    }
  })
  return (
    <Form methods={methods as any} {...props} >
      <SubmitButton {...submitButton}>Log out</SubmitButton>
    </Form>
  )
}