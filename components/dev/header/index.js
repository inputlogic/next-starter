import Link from 'next/link'
import { useIsLoggedIn } from 'hooks/use-is-logged-in'
import styles from './header.module.scss'
import ThemeToggle from '../theme-toggle'
import { useTransitionRouter } from 'next-view-transitions'

const Links = [
  { href: '/dev/modals', label: 'Modals' },
  { href: '/dev/sentry', label: 'Sentry Error Handling' },
  { href: '/dev/billing', label: 'Billing' },
  { href: '/dev/list', label: 'List' },
  { href: '/dev/stylesheet', label: 'Stylesheet' },
  { href: '/dev/login', label: 'Login' },
  { href: '/dev/signup', label: 'Signup' },
]

export const Header = () => {
  const isLoggedIn = useIsLoggedIn()
  const router = useTransitionRouter()

  const pageAnimation = () => {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          scale: 1,
          transform: 'translateY(0)',
        },
        {
          opacity: 0.5,
          scale: 0.75,
          transform: 'translateY(-100px)',
        },
      ],
      {
        duration: 1000,
        easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
        fill: 'forwards',
        pseudoElement: '::view-transition-old(root)',
      }
    )

    document.documentElement.animate(
      [
        {
          transform: 'translateY(100%)',
        },
        {
          transform: 'translateY(0)',
        },
      ],
      {
        duration: 1000,
        easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
        fill: 'forwards',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }

  return (
    <header className={styles.header}>
      <h3>
        <Link href="/dev">Starter</Link>
      </h3>
      <div>
        {isLoggedIn === true && <Link href="/dev/account">Account</Link>}
        {isLoggedIn === false && (
          <>
            {Links.map((link) => (
              <Link
                key={link.label}
                onClick={(e) => {
                  e.preventDefault()
                  router.push(link.href, {
                    onTransitionReady: pageAnimation,
                  })
                }}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </>
        )}
        <ThemeToggle />
      </div>
    </header>
  )
}
