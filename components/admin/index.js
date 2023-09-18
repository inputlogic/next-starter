import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleUpIcon,
  TriangleDownIcon,
} from '@radix-ui/react-icons'
import { classnames } from 'util/classnames'
import styles from './admin.module.scss'

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

export const Admin = () => (
  <div className={styles.admin}>
    <nav className={styles.nav}>
      <div className={styles.navSection}>
        <h3>Favourites</h3>
        <a href="#">Dashboard</a>
        <a href="#" className={styles.active}>
          Users
        </a>
        <div className={styles.nested}>
          <a href="#"> List </a>
          <a href="#"> Create </a>
          <a href="#"> Other </a>
        </div>
      </div>
    </nav>
    <div className={styles.main}>
      <div className={styles.filters}>
        <input placeholder="Search..." className={styles.filterActive} />
        <button>Role</button>
        <button className={styles.filterActive}>Archived</button>
        <button disabled className={styles.clear}>
          Clear
        </button>
      </div>
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
      <br />
      <div className={styles.pagination}>
        <a>
          <ChevronLeftIcon />
        </a>
        <a>1</a>
        <div>
          <span>...</span>
        </div>
        <a>9</a>
        <a className={styles.paginationActive}>10</a>
        <a>11</a>
        <div>
          <span>...</span>
        </div>
        <a>21</a>
        <a>
          <ChevronRightIcon />
        </a>
      </div>
      <br />
      <div>
        <h3>Form</h3>
      </div>
      <form className={styles.form}>
        <div className={styles.formError}>An unexpected error occured</div>
        <div className={styles.field}>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
          </div>
          <input
            className={styles.input}
            id="email"
            type="email"
            placeholder="Email"
          />
          <div className={styles.fieldError}>
            <span>This field is required</span>
          </div>
        </div>
        <button className={styles.submit}>Submit</button>
      </form>
    </div>
  </div>
)
