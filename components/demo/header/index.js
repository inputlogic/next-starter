import Link from 'next/link'
import { useQuery } from 'hooks/use-query'
import styles from './header.module.scss'

const useIsLoggedIn = () => {
  const {data} = useQuery({url: '/public/user/is-logged-in'})
  return data?.isLoggedIn
}

export const Header = () => {
  const isLoggedIn = useIsLoggedIn()
  return <header className={styles.header}>
    <h3><Link href='/demo'>Starter</Link></h3>
    <div>
      {isLoggedIn === true && <Link href='/demo/account'>Account</Link>}
      {isLoggedIn === false && <>
        <Link href='/demo/login'>Login</Link>
        <Link href='/demo/signup'>Signup</Link>
      </>}
    </div>
  </header>
}
