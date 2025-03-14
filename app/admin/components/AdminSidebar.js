'use client';

import { useState } from 'react';
import { Text, Flex, Button, IconButton } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import styles from './AdminSidebar.module.scss';

const menuItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Users', path: '/admin/users' },
  { label: 'Products', path: '/admin/products' },
  { label: 'Settings', path: '/admin/settings' },
];

export default function AdminSidebar({ theme, toggleTheme }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={styles.sidebar}>
      <Flex justify="between" align="center" p="4">
        <div className={styles.logo}>
          <Text size="5" weight="bold">Admin Panel</Text>
        </div>
        
        <IconButton 
          className={styles.menuToggle}
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
      
      <div className={`${styles.menuItems} ${mobileMenuOpen ? styles.open : ''}`}>
        <Flex direction="column" gap="1" p="4" pt="0" className={styles.menuContainer}>
          <div className={styles.menuLinks}>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path} 
                  className={styles.menuLink} 
                  onClick={() => setMobileMenuOpen(false)}
                  passHref
                >
                  <div className={`${styles.menuItem} ${isActive ? styles.active : ''}`}>
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className={styles.themeToggleWrapper}>
            <Flex align="center" gap="2">
              <Text size="2">Theme</Text>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </Flex>
          </div>
        </Flex>
      </div>
    </nav>
  );
}