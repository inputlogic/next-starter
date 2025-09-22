import { Form, useForm, SubmitButton } from 'components/form'
import { goToStripePortal } from 'components/billing/utils'

interface PortalFormProps {
  state?: Record<string, any>
  buttonText?: string
}

export const PortalForm = ({state = {next: '/app'}, buttonText = 'Billing'}: PortalFormProps) => {
  const methods = useForm({
    onSubmit: () => goToStripePortal(state)
  })
  return <Form methods={methods} >
    <SubmitButton>{buttonText}</SubmitButton>
  </Form>
}