import Link from 'next/link'

import styles from './page.module.scss'

const DemoPage = () => {
  return <div>
    <h2>Demo</h2>
    <div className={styles.links} >
      <Link href='/demo/modals'>Modals</Link>
      <Link href='/demo/sentry'>Sentry Error Handling</Link>
      <Link href='/demo/billing'>Billing</Link>
      <Link href='/demo/list'>List</Link>
      <Link href='/demo/stylesheet'>Stylesheet</Link>
    </div>
  </div>
}

export default DemoPage
