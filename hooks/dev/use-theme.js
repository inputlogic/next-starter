'use client'

import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('demo-theme')
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
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('demo-theme', newTheme)
    document.body.dataset.theme = newTheme
  }

  return { theme, toggleTheme }
}