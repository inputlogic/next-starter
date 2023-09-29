import { forwardRef } from 'react'
import styles from './input.module.scss'

export const Input = forwardRef((props, ref) => (
  <input ref={ref} className={styles.input} {...props} />
))
