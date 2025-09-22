import Link from 'next/link'
import { useIsLoggedIn } from 'hooks/use-is-logged-in'
import styles from './header.module.scss'
import ThemeToggle from '../theme-toggle'

export const Header = () => {
  const isLoggedIn = useIsLoggedIn()
  return <header className={styles.header}>
    <h3><Link href='/dev'>Starter</Link></h3>
    <div>
      {isLoggedIn === true && <Link href='/dev/account'>Account</Link>}
      {isLoggedIn === false && <>
        <Link href='/dev/login'>Login</Link>
        <Link href='/dev/signup'>Signup</Link>
      </>}
      <ThemeToggle />
    </div>
  </header>
}