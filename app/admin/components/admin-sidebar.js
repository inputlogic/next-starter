'use client';

import { useState, useRef } from 'react';
import { Text, Flex, Button, IconButton, DropdownMenu } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './theme-toggle';
import { AdminLogoutButton } from './form';
import styles from './admin-sidebar.module.scss';

const menuItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Users', path: '/admin/users' },
  { label: 'Products', path: '/admin/products' },
];

export default function AdminSidebar({ theme, toggleTheme }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const triggerRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleNavigation = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles['header-container']}>
        <Flex justify="between" align="center" p="4">
          <div className={styles.logo}>
            <Text size="5" weight="bold">Admin Panel</Text>
          </div>
          
          <Flex align="center" gap="2">
            <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenu.Trigger ref={triggerRef}>
                <div className={styles['settings-icon']}>
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.9332 8.66669C12.9707 8.45003 12.9899 8.22503 12.9899 8.00003C12.9899 7.77503 12.9707 7.55003 12.9332 7.33336L14.4874 6.10003C14.6416 5.97503 14.6832 5.75836 14.5874 5.58336L13.2541 3.25003C13.1582 3.07503 12.9416 3.01669 12.7666 3.11669L11.1166 3.86669C10.7749 3.60836 10.4041 3.40003 9.99991 3.24169L9.71657 1.50003C9.68324 1.30836 9.51657 1.16669 9.31657 1.16669H6.64991C6.44991 1.16669 6.28324 1.30836 6.24991 1.50003L5.96657 3.24169C5.56241 3.40003 5.19157 3.60836 4.84991 3.86669L3.19991 3.11669C3.02491 3.01669 2.80824 3.07503 2.71241 3.25003L1.37907 5.58336C1.28324 5.75836 1.32491 5.97503 1.47907 6.10003L3.03324 7.33336C2.99574 7.55003 2.97657 7.77503 2.97657 8.00003C2.97657 8.22503 2.99574 8.45003 3.03324 8.66669L1.47907 9.90003C1.32491 10.025 1.28324 10.2417 1.37907 10.4167L2.71241 12.75C2.80824 12.925 3.02491 12.9834 3.19991 12.8834L4.84991 12.1334C5.19157 12.3917 5.56241 12.6 5.96657 12.7584L6.24991 14.5C6.28324 14.6917 6.44991 14.8334 6.64991 14.8334H9.31657C9.51657 14.8334 9.68324 14.6917 9.71657 14.5L9.99991 12.7584C10.4041 12.6 10.7749 12.3917 11.1166 12.1334L12.7666 12.8834C12.9416 12.9834 13.1582 12.925 13.2541 12.75L14.5874 10.4167C14.6832 10.2417 14.6416 10.025 14.4874 9.90003L12.9332 8.66669Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className={styles.dropdownContent} style={{ width: '240px', minWidth: '240px', padding: '4px 0 8px' }}>
                <div className={styles.themeToggleContainer}>
                  <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </div>
                <DropdownMenu.Item asChild className={styles.menuItem}>
                  <Link href="/admin/account" className={styles['dropdown-link']} onClick={handleNavigation}>
                    Account
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild className={styles.menuItem}>
                  <Link href="/admin/settings" className={styles['dropdown-link']} onClick={handleNavigation}>
                    Settings
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <div className={styles.logoutContainer}>
                  <AdminLogoutButton size="2" variant="ghost" className={styles.logoutButton} />
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            
            <IconButton 
              className={styles['menu-toggle']}
              variant="ghost" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </IconButton>
          </Flex>
        </Flex>
      </div>
      
      <div className={`${styles['menu-items']} ${mobileMenuOpen ? styles.open : ''}`}>
        <Flex direction="column" gap="1" p="4" pt="0" className={styles['menu-container']}>
          <div className={styles['menu-links']}>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path} 
                  className={styles['menu-link']} 
                  onClick={() => setMobileMenuOpen(false)}
                  passHref
                >
                  <div className={`${styles['menu-item']} ${isActive ? styles.active : ''}`}>
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
          
        </Flex>
      </div>
    </nav>
  );
}