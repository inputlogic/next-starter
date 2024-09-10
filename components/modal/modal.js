import {classnames} from 'util/classnames'
import styles from './modal.module.scss'

export const Modal = ({
  open,
  close,
  closeOnClickBackdrop = true,
  className,
  hideClose = false,
  children,
  ...props
}) =>
  <dialog
    onClick={ev => {
      if (!closeOnClickBackdrop) return
      const dialog = document.getElementById(props.id)
      if (!isClickInsideDialog(dialog, ev)) close()
    }}
    className={classnames(styles.modal, !hideClose && styles['has-close'], className)}
    {...props}
  >
    {!hideClose && <button className={styles.close} onClick={() => close()} />}
    {children}
  </dialog>

const isClickInsideDialog = (dialog, event) => {
  const rect = dialog.getBoundingClientRect()
  return rect.top <= event.clientY
    && event.clientY <= rect.top + rect.height
    && rect.left <= event.clientX
    && event.clientX <= rect.left + rect.width
}
