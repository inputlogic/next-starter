'use client';

import { IconButton } from '@radix-ui/themes';
import styles from './theme-toggle.module.scss';

export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark';
  
  return (
    <div className={styles.themeToggle}>
      <IconButton 
        size="2"
        variant="ghost"
        onClick={toggleTheme}
        className={styles.iconButton}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {isDark ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z" 
              fill="currentColor" 
            />
            <path d="M8 2.5V1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 15V13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.5 3.5L2.5 2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 12.5L13.5 13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.5 8H1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 8H13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.5 12.5L2.5 13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 3.5L13.5 2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C4.96243 13.5 2.5 11.0376 2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C8.29168 2.5 8.57757 2.5229 8.85613 2.56709C8.06605 3.34229 7.5 4.46019 7.5 5.75C7.5 8.09721 9.40279 10 11.75 10C12.1307 10 12.4968 9.9474 12.8442 9.84816C13.2547 9.28191 13.5 8.6156 13.5 8Z"
              fill="currentColor" 
            />
          </svg>
        )}
      </IconButton>
    </div>
  );
}