import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Icon } from '@/components/icon'
import { classnames } from '@/util/classnames'

import styles from './header.module.scss'

export const Header = () => {
  const [slim, setSlim] = useState(false)

  return (
    <header className={classnames([styles.wrapper, slim ? styles.slim : null])}>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.logo}>
            <Logo minimal={slim} />
          </a>
        </Link>
        <button
          className={classnames([
            'button-reset',
            styles.toggle,
            slim ? styles.reverse : null,
          ])}
          onClick={() => setSlim(!slim)}
        >
          <Icon
            name="chevron-left"
            variation="stroke"
            className={styles.icon}
          />
        </button>
      </div>
    </header>
  )
}
