import { forwardRef, useState, CSSProperties, InputHTMLAttributes } from 'react'
import { Icon } from 'components/icon'
import { classnames } from 'util/classnames'
import { ErrorMessage } from 'components/inputs/error-message'
import styles from './text-input.module.scss'

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  name?: string
  value?: string | number
  label?: string
  hideLabel?: boolean
  placeholder?: string
  error?: string | boolean
  icon?: string
  id?: string
  className?: string
  style?: CSSProperties
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = 'text',
      name,
      value,
      label,
      hideLabel = false,
      placeholder,
      error = false,
      icon,
      id,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [showPass, setShowPass] = useState(false)
    const inputId = id || name

    return (
      <>
        <div
          className={classnames([
            styles['input-component'],
            error && styles['error'],
            className,
          ])}
          style={style}
        >
          {label && (
            <label
              htmlFor={inputId}
              className={classnames([hideLabel ? 'visually-hidden' : null])}
            >
              {label}
            </label>
          )}
          {name === 'cost' && <span className="currency-symbol">$</span>}
          <input
            type={type === 'password' ? (showPass ? 'text' : 'password') : type}
            name={name}
            value={value}
            autoComplete="off"
            placeholder={placeholder}
            id={inputId}
            ref={ref}
            className={classnames([
              hideLabel ? styles['no-label'] : null,
              icon ? styles['has-icon'] : null,
            ])}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className={styles['toggle-pass']}
            >
              <Icon name={showPass ? 'eye-cross' : 'eye'} />
            </button>
          )}
          {icon ? <Icon name={icon} className={styles.icon} /> : null}
          {error && (
            <ErrorMessage className={styles['error-message']}>
              {error}
            </ErrorMessage>
          )}
        </div>
      </>
    )
  },
)

TextInput.displayName = 'TextInput'