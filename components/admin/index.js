import { classnames } from 'util/classnames'
import styles from './admin.module.scss'

const Checkbox = () => <input style={{ margin: '0' }} type="checkbox" />

const fakeUsers = [
  [<Checkbox key="check" />, '1', 'john@example.com', 'John', 'Doe'],
  [<Checkbox key="check" />, '2', 'dale@example.com', 'Dale', 'Cooper'],
]

export const Admin = () => (
  <div className={styles.admin}>
    <nav className={styles.nav}>
      <div className={styles.navSection}>
        <h3>Favourites</h3>
        <a href="#" className={styles.active}>
          Users
        </a>
        <div className={styles.nested}>
          <a href="#"> List </a>
          <a href="#"> Create </a>
          <a href="#"> Other </a>
        </div>
        <a href="#">Dashboard</a>
      </div>
    </nav>
    <div className={styles.main}>
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
              ].map((title) => (
                <th key={title}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fakeUsers.map((user, i) => (
              <tr key={i}>
                {user.map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <div className={styles.pagination}>
        <a>Back</a>
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
        <a>Forward</a>
      </div>
      <br />
      <div>Form</div>
    </div>
  </div>
)
