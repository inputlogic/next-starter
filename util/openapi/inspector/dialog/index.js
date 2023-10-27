import * as RadixDialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import styles from './dialog.module.scss'

export const Dialog = ({ open, onOpenChange, trigger, title, children }) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.DialogOverlay} />
        <RadixDialog.Content className={styles.DialogContent}>
          {title && (
            <RadixDialog.Title className={styles.DialogTitle}>
              {title}
            </RadixDialog.Title>
          )}
          {children}
          <RadixDialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
