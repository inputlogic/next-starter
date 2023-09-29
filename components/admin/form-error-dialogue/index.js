import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button } from 'components/admin/button'
import styles from './form-error-dialogue.module.scss'

const generalErrorMessage = (error) => {
  const { code } = error
  switch (code) {
    case 500:
      return 'Oops! Our server is having issues. Please try again later.'
    case 404:
      return "That's odd, looks like an issue on our end. Please try again later."
    case 403:
    case 401:
      return "You don't have permission to do this. Please log in or contact support."
    case 400:
      return 'It seems like some information is missing or incorrect. Please check your inputs.'
    case 408:
      return 'Your request timed out. Maybe try again?'
    case 429:
      return 'Too many requests! Please wait a bit and try again.'
    default:
      return code
        ? 'Something went wrong on our end. Please try again later.'
        : 'An unexpected error occurred. Check your network connection or try later.'
  }
}

const TechnicalDetails = ({ error }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={styles.more}>
      <button onClick={() => setIsOpen((curr) => !curr)}>
        {isOpen ? 'hide' : 'show'} technical details 👾
      </button>
      {isOpen && (
        <div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export const FormErrorDialog = ({ error }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" className={styles.moreInfoButton}>
          more info
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>
            Error Details
          </Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}>
            {generalErrorMessage(error)}
          </Dialog.Description>
          <TechnicalDetails error={error} />
          <div className={styles.buttons}>
            <Button>Request Support</Button>
            <Dialog.Close asChild>
              <Button>Done</Button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
