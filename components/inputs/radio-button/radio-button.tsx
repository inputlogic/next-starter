'use client'

import { forwardRef, useMemo, InputHTMLAttributes } from 'react'
import styles from './radio-button.module.scss'

export interface RadioButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id?: string
  name?: string
  value?: string
  label?: string
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ id: givenId, name, value, label, ...props }, ref) => {
    const id = useMemo(
      () => givenId || `radio-${name}-${value}`.replace(/\s+/g, '-'),
      [givenId, name, value]
    )
    return (
      <div className={styles['radio-button-component']}>
        <input
          type="radio"
          name={name}
          value={value}
          id={id}
          ref={ref}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }
)

RadioButton.displayName = 'RadioButton'
