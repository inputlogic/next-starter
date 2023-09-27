import { TriangleUpIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import { classnames } from 'util/classnames'
import styles from './table.module.scss'

export const Checkbox = () => <input style={{ margin: '0' }} type="checkbox" />

export const Th = ({ children, isOrderable, isActiveUp, isActiveDown }) => (
  <th
    className={classnames(
      styles.orderable,
      (isActiveUp || isActiveDown) && styles.activeOrder
    )}
  >
    <div className={styles.th}>
      {children}
      {isOrderable && (
        <div className={styles.tableOrder}>
          <TriangleUpIcon className={isActiveUp && styles.activeOrderIcon} />
          <TriangleDownIcon
            className={isActiveDown && styles.activeOrderIcon}
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
