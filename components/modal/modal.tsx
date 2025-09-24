import { ReactNode, HTMLAttributes, MouseEvent } from 'react'
import { classnames } from 'util/classnames'
import styles from './modal.module.scss'

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
  close: () => void
  closeOnClickBackdrop?: boolean
  hideClose?: boolean
  children: ReactNode
}

export const Modal = ({
  open,
  close,
  closeOnClickBackdrop = true,
  className,
  hideClose = false,
  children,
  ...props
}: ModalProps) =>
  <div
    onClick={(ev: MouseEvent<HTMLDivElement>) => {
      if (!closeOnClickBackdrop) return
      const target = ev.target as HTMLElement
      if (target.classList.contains(styles['modal-backdrop'])) {
        close()
      }
    }}
    className={classnames(
      styles['modal-backdrop'],
      'modal', // global class used for closing modals in use-modal
      className
    )}
    {...props}
  >
    <div className={classnames(styles.modal, !hideClose && styles['has-close'])}>
      {!hideClose && <button className={styles.close} onClick={() => close()} />}
      {children}
    </div>
  </div>