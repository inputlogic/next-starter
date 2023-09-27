import { TriangleUpIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import { classnames } from 'util/classnames'
import styles from './table.module.scss'

const Checkbox = () => <input style={{ margin: '0' }} type="checkbox" />

const fakeUsers = [
  [
    <Checkbox key="check" />,
    <a key="link" href="#">
      1
    </a>,
    'john@example.com',
    'John',
    'Doe',
    '{}',
  ],
  [
    <Checkbox key="check" />,
    <a key="link" href="#">
      2
    </a>,
    'dale@example.com',
    'Dale',
    'Cooper',
    '{}',
  ],
]

export const Table = () => (
  <div className={classnames(styles.table, styles.hasCheckbox)}>
    <table>
      <thead>
        <tr>
          {[
            <Checkbox key="check" />,
            'id',
            'email',
            'first name',
            'last name',
            'data',
          ].map((title, i) => (
            <th
              key={title}
              className={classnames(
                styles.orderable,
                i == 2 && styles.activeOrder
              )}
            >
              <div className={styles.th}>
                {title}
                {i !== 0 && (
                  <div className={styles.tableOrder}>
                    <TriangleUpIcon
                      className={i == 2 && styles.activeOrderIcon}
                    />
                    <TriangleDownIcon />
                  </div>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {fakeUsers.map((user, i) => (
          <tr key={i}>
            {user.map((value, i) => (
              <td key={i}>{typeof value === 'Object' ? '{}' : value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
