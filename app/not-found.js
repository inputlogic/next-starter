'use client'

import { Button } from 'components/button'
import { classnames } from 'util/classnames'

import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <main className={styles.wrapper}>
      <div className={classnames(['container'])}>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.caption}>
          Please check the url you entered. If you feel you've reached this page
          in error contact support.
        </p>
        <div>
          <Button className={styles.button} href="/contact">
            Contact Support
          </Button>
        </div>
      </div>
    </main>
  )
}