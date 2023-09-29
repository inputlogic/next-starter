import { Loading } from 'components/loading'
import { CheckIcon } from '@radix-ui/react-icons'
import { classnames } from 'util/classnames'
import styles from './button.module.scss'

export const Button = ({ isLoading, isSuccess, children, ...props }) => (
  <button className={styles.button} {...props}>
    {isLoading && (
      <div className={styles.loading}>
        <Loading noPadding />
      </div>
    )}
    {isSuccess && (
      <div className={styles.success}>
        <CheckIcon />
      </div>
    )}
    <div
      className={classnames(
        styles.main,
        isLoading && styles.isLoading,
        isSuccess && styles.isSuccess
      )}
    >
      {children}
    </div>
  </button>
)
