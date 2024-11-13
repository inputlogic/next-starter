import { Form, useForm, SubmitButton } from 'components/form'
import { goToStripePortal } from 'components/billing/utils'

export const PortalForm = ({state = {next: '/app'}, buttonText = 'Billing'}) => {
  const methods = useForm({
    onSubmit: () => goToStripePortal(state)
  })
  return <Form methods={methods} >
    <SubmitButton>{buttonText}</SubmitButton>
  </Form>
}

