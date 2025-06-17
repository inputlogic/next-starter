import { useFormContext } from 'react-hook-form'
import { Button } from '../../button'

export const SubmitButton = (props) => {
  const { formState: { isSubmitting } } = useFormContext()
  return <Button
    type='submit'
    isLoading={isSubmitting}
    disabled={isSubmitting}
    {...props}
  />
}
