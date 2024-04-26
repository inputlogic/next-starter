import styles from './radio-button.module.scss'

export const RadioButton = ({ id, name, value, label, ...props }) => (
  <div className={styles['radio-button-component']}>
    <input type="radio" name={name} value={value} id={id} {...props} />
    <label htmlFor={id}>{label}</label>
  </div>
)
