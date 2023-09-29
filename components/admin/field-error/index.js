import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import styles from './field-error.module.scss'

export const FieldError = ({ children, ...props }) => (
  <span className={styles.fieldError} {...props}>
    <ExclamationTriangleIcon />
    {children}
  </span>
)
