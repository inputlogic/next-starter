import { useFormContext } from 'react-hook-form'
import { Button } from 'components/button'
import { ButtonHTMLAttributes } from 'react'

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variation?: 'primary' | 'secondary' | 'outline' | 'text' | 'icon'
  size?: 'small' | 'medium'
  icon?: string
  iconPosition?: 'left' | 'right'
  iconVariation?: 'filled' | 'stroked'
  iconColor?: string
  loadingText?: string
  hideText?: boolean
  fullWidth?: boolean
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext()

  return (
    <Button
      type="submit"
      isLoading={isSubmitting}
      disabled={isSubmitting}
      {...props}
    />
  )
}
