import { HTMLAttributes, ReactNode } from 'react'
import { classnames } from 'util/classnames'
import styles from './error-message.module.scss'

export interface ErrorMessageProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  className?: string
}

export const ErrorMessage = ({
  children,
  className,
  ...props
}: ErrorMessageProps) => (
  <div className={classnames([styles['error-message'], className])} {...props}>
    {children}
  </div>
)
