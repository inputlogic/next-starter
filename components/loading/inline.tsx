import { CSSProperties } from 'react'
import { classnames } from 'util/classnames'

import styles from './inline.module.scss'

interface InlineLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: CSSProperties
}

export const InlineLoader = ({ className, style, ...props }: InlineLoaderProps) => {
  return <div className={classnames([styles.loader, className])} style={style} {...props} />
}