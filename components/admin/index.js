import { Nav } from './nav'
import { Table } from './table'
import { Pagination } from './pagination'
import { Input } from './input'
import styles from './admin.module.scss'

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
      <Pagination />
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
          <Input id="email" type="email" placeholder="Email" />
          <div className={styles.fieldError}>
            <span>This field is required</span>
          </div>
        </div>
        <button className={styles.submit}>Submit</button>
      </form>
    </div>
  </div>
)
