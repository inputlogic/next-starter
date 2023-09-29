import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { FormErrorDialog } from 'components/admin/form-error-dialogue'
import styles from './form-error.module.scss'

export const FormError = ({ children, error, ...props }) => (
  <span className={styles.formError} {...props}>
    <ExclamationTriangleIcon />
    <div>
      {children} <FormErrorDialog error={error} />
    </div>
  </span>
)
