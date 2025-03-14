import Link from 'next/link'

import styles from './page.module.scss'

const DevPage = () => {
  return <div>
    <h2>Dev</h2>
    <div className={styles.links} >
      <Link href='/dev/modals'>Modals</Link>
      <Link href='/dev/sentry'>Sentry Error Handling</Link>
      <Link href='/dev/billing'>Billing</Link>
      <Link href='/dev/list'>List</Link>
      <Link href='/dev/stylesheet'>Stylesheet</Link>
    </div>
  </div>
}

export default DevPage
