'use client'

import { useFormContext } from 'react-hook-form'
import { Button } from '@radix-ui/themes'
import { ReloadIcon } from '@radix-ui/react-icons'
import styles from './submit-button.module.scss'

export const AdminSubmitButton = ({ children, ...props }) => {
  const { formState: { isSubmitting } } = useFormContext()
  
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      {...props}
    >
      {isSubmitting ? (
        <>
          <ReloadIcon className={styles.spinner} />
          Submitting...
        </>
      ) : (
        children
      )}
    </Button>
  )
}