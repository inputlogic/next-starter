import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Nav } from './nav'
import { Table } from './table'
import styles from './admin.module.scss'

const Checkbox = () => <input style={{ margin: '0' }} type="checkbox" />

export const Admin = () => (
  <div className={styles.admin}>
    <Nav />
    <div className={styles.main}>
      <div className={styles.filters}>
        <input placeholder="Search..." className={styles.filterActive} />
        <button>Role</button>
        <button className={styles.filterActive}>Archived</button>
        <button disabled className={styles.clear}>
          Clear
        </button>
      </div>
      <Table />
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
