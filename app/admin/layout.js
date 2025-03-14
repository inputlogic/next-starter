'use client';

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import AdminSidebar from './components/admin-sidebar';
import useTheme from 'hooks/use-theme';
import styles from './layout.module.scss';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  
  // Check if the current page is the login page
  const isLoginPage = pathname === '/admin/login';

  return (
    <Theme appearance={theme} accentColor="blue" hasBackground>
      <div>
        {isLoginPage ? (
          <div>
            {children}
          </div>
        ) : (
          <div className={styles['admin-layout']}>
            <AdminSidebar theme={theme} toggleTheme={toggleTheme} />
            <main className={styles.content}>
              {children}
            </main>
          </div>
        )}
      </div>
    </Theme>
  );
}
