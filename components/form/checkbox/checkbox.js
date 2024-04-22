import { forwardRef } from 'react'
import { classnames } from 'util/classnames'
import { Icon } from 'components/icon'
import styles from './checkbox.module.scss'

export const Checkbox = forwardRef(
  (
    { id, name, value, label, icon, iconVariation = 'filled', ...props },
    ref
  ) => (
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
)

Checkbox.displayName = 'Checkbox'
