'use client'

import { useTheme } from 'hooks/use-theme'
import styles from './theme-toggle.module.scss'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button 
      className={styles.themeToggle} 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className={styles.toggleTrack}>
        <div className={`${styles.toggleThumb} ${theme === 'dark' ? styles.active : ''}`}>
          <span className={styles.icon}>
            {theme === 'light' ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle