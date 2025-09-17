import { classnames } from 'util/classnames'
import styles from './icon.module.scss'

export interface IconProps {
  name: string
  className?: string
  color?: string
  variation?: 'stroked' | 'filled'
}

export const Icon = ({ name, className, color, variation = 'stroked' }: IconProps) => (
  <>
    <span
      className={classnames([
        styles['icon-wrap'],
        className,
        styles[variation],
        'icon-wrap',
      ])}
    >
      <svg className={styles.icon} style={{ color }}>
        <use xlinkHref={`#icon-${name}`}></use>
      </svg>
    </span>
  </>
)