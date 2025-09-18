import { forwardRef, TextareaHTMLAttributes } from 'react'
import { classnames } from 'util/classnames'
import { ErrorMessage } from 'components/inputs/error-message'
import styles from './textarea.module.scss'

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  name?: string
  value?: string
  label?: string
  placeholder?: string
  error?: string | boolean
  id?: string
  rows?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { name, value, label, placeholder, error = false, id, rows = 4, ...props },
    ref
  ) => {
    const elementId = id || name
    return (
      <>
        <div
          className={classnames([
            styles['input-component'],
            error && styles['error'],
          ])}
        >
          {label && <label htmlFor={elementId}>{label}</label>}
          <textarea
            rows={rows}
            name={name}
            value={value}
            autoComplete="off"
            placeholder={placeholder}
            id={elementId}
            ref={ref}
            {...props}
          />
        </div>
        {error && typeof error === 'string' && (
          <ErrorMessage>{error}</ErrorMessage>
        )}
      </>
    )
  }
)

Textarea.displayName = 'Textarea'
