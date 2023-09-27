import { TriangleUpIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import { classnames } from 'util/classnames'
import styles from './table.module.scss'

export const Checkbox = () => <input style={{ margin: '0' }} type="checkbox" />

export const Th = ({
  children,
  isOrderable,
  isActiveUp,
  isActiveDown,
  ...props
}) => (
  <th
    className={classnames(
      isOrderable && styles.orderable,
      (isActiveUp || isActiveDown) && styles.activeOrder
    )}
    {...props}
  >
    <div className={styles.th}>
      {children}
      {isOrderable && (
        <div className={styles.tableOrder}>
          <TriangleUpIcon
            className={classnames(isActiveUp && styles.activeOrderIcon)}
          />
          <TriangleDownIcon
            className={classnames(isActiveDown && styles.activeOrderIcon)}
          />
        </div>
      )}
    </div>
  </th>
)

export const Table = ({ children }) => (
  <div className={classnames(styles.table, styles.hasCheckbox)}>
    <table>{children}</table>
  </div>
)
