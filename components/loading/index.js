import { classnames } from 'util/classnames'
import styles from './loading.module.scss'

export const Loading = ({ noPadding = false }) => (
  <div
    className={classnames(
      styles.loadingEllipsis,
      noPadding && styles.noPadding
    )}
  >
    <div>
      <span />
      <span />
      <span />
    </div>
  </div>
)
