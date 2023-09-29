import { Loading } from 'components/loading'
import { classnames } from 'util/classnames'
import styles from './button.module.scss'

export const Button = ({ isLoading, children, ...props }) => (
  <button className={styles.button} {...props}>
    {isLoading && (
      <div className={styles.loading}>
        <Loading noPadding />
      </div>
    )}
    <div className={classnames(styles.main, isLoading && styles.isLoading)}>
      {children}
    </div>
  </button>
)
