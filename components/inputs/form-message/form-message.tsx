import { ReactNode } from 'react'
import { classnames } from 'util/classnames'
import styles from './form-message.module.scss'
import { Icon } from 'components/icon'

export interface FormMessageProps {
  variant?: 'success' | 'error'
  children?: ReactNode
}

export const FormMessage = ({ variant, children }: FormMessageProps) => {
  const iconNames: Record<'success' | 'error', string> = {
    success: 'check',
    error: 'x',
  }

  const iconName = variant ? iconNames[variant] : undefined
  const iconClass = variant === 'error' ? 'not-filled' : 'filled'

  return (
    <div
      className={classnames(styles['form-message'], variant && styles[variant])}
    >
      {iconName ? (
        <div className={styles.icon}>
          <Icon name={iconName} className={iconClass} />
        </div>
      ) : null}
      <div className={styles.content}>{children}</div>
    </div>
  )
}
