'use client'

import { forwardRef, useMemo } from 'react'
import styles from './radio-button.module.scss'

export const RadioButton = forwardRef(({ id: givenId, name, value, label, ...props }, ref) => {
  const id = useMemo(() => givenId || `radio-${name}-${value}`.replace(/\s+/g, '-'), [givenId, name, value])
  return <div className={styles['radio-button-component']}>
    <input type="radio" name={name} value={value} id={id} ref={ref} {...props} />
    <label htmlFor={id}>{label}</label>
  </div>
})
