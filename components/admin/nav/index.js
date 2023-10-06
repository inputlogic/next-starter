import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './nav.module.scss'

export const Nav = ({ links }) => {
  const router = useRouter()
  return (
    <nav className={styles.nav}>
      {links?.map((section) => (
        <div key={section.name} className={styles.navSection}>
          <h3>{section.name}</h3>
          {section.links.map((link) => (
            <React.Fragment key={link.href}>
              <Link
                href={link.href}
                className={link.href === router.pathname ? styles.active : ''}
              >
                {link.name}
              </Link>
              {link.links && (
                <div className={styles.nested}>
                  {link.links.map((link) => (
                    <Link
                      href={link.href}
                      key={link.name}
                      className={
                        link.href === router.pathname ? styles.active : ''
                      }
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </nav>
  )
}
