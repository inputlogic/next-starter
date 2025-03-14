'use client';

import { IconButton } from '@radix-ui/themes';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <IconButton 
      className={styles.themeToggle}
      variant="ghost"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M8 12.5C10.4853 12.5 12.5 10.4853 12.5 8C12.5 5.51472 10.4853 3.5 8 3.5C5.51472 3.5 3.5 5.51472 3.5 8C3.5 10.4853 5.51472 12.5 8 12.5Z" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path d="M8 1V2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14V15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.75 2.75L3.75 3.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.25 12.25L13.25 13.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 8H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 8H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.75 13.25L3.75 12.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.25 3.75L13.25 2.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M13.5 8.25C13.5 11.5637 10.8137 14.25 7.5 14.25C4.18629 14.25 1.5 11.5637 1.5 8.25C1.5 4.93629 4.18629 2.25 7.5 2.25C7.5 2.25 8 3 8.5 4C9 5 9 6 9 6.5C9 7.32843 8.32843 8 7.5 8" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}
    </IconButton>
  );
}