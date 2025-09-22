import { ReactNode } from 'react'
import { Header } from '../header'
import styles from './layout.module.scss'

interface DemoLayoutProps {
  children: ReactNode
}

export const DemoLayout = ({ children }: DemoLayoutProps) =>
  <div className={styles.layout}>
    <Header />
    <main>
      {children}
    </main>
  </div>