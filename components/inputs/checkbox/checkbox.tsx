import { forwardRef, useMemo, InputHTMLAttributes } from 'react'
import { classnames } from 'util/classnames'
import { Icon } from 'components/icon'
import styles from './checkbox.module.scss'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id?: string
  name?: string
  value?: string
  label?: string
  icon?: string
  iconVariation?: 'filled' | 'stroked'
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id: givenId,
      name,
      value,
      label,
      icon,
      iconVariation = 'filled',
      ...props
    },
    ref
  ) => {
    const id = useMemo(
      () => givenId || `checkbox-${name}-${value || ''}`.replace(/\s+/g, '-'),
      [givenId, name, value]
    )
    return (
      <div
        className={classnames(
          styles['checkbox-component'],
          icon ? styles['has-icon'] : null
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          name={name}
          value={value}
          id={id}
          {...props}
        />
        {icon ? (
          <Icon
            className={classnames([iconVariation ? 'filled' : '', styles.icon])}
            name={icon}
          />
        ) : null}
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
