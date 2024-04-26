import { useFormContext } from 'react-hook-form'
import { Button } from '/components/button'

export const SubmitButton = (props) => {
  const { formState: { isSubmitting, errors: {formError, ...errors} } } = useFormContext()
  return <Button
    type='submit'
    isLoading={isSubmitting}
    disabled={isSubmitting || Object.keys(errors).length}
    {...props}
  />
}
