import { FC } from 'react'
import styles from './placeholder.module.scss'

interface PlaceholderProps {
  name: string
}

export const Placeholder: FC<PlaceholderProps> = ({ name }) => (
  <div className={styles.wrapper}>
    <div className={styles.content}>{name}</div>
  </div>
)