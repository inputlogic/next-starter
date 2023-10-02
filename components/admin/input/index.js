import { useFormContext } from 'react-hook-form'
import { forwardRef } from 'react'
import styles from './input.module.scss'

export const Input = forwardRef((props, ref) => (
  <input ref={ref} className={styles.input} {...props} />
))

export const FormInput = ({ name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext() // retrieve all hook methods
  // TODO: handle errors
  return <Input {...props} {...register(name)} />
}
