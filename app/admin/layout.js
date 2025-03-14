'use client';

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import AdminSidebar from './components/AdminSidebar';
import useTheme from 'hooks/use-theme';
import styles from './layout.module.scss';

export default function AdminLayout({ children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Theme appearance={theme} accentColor="blue">
      <div className={styles.adminLayout}>
        <AdminSidebar theme={theme} toggleTheme={toggleTheme} />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </Theme>
  );
}
