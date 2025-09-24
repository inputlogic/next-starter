'use client'

import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface UseThemeReturn {
  theme: Theme
  toggleTheme: () => void
}

export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('demo-theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.body.dataset.theme = savedTheme
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Use system preference if no saved theme
      setTheme('dark')
      document.body.dataset.theme = 'dark'
    }
  }, [])

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('demo-theme', newTheme)
    document.body.dataset.theme = newTheme
  }

  return { theme, toggleTheme }
}