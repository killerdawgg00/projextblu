'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  // Apply theme to document
  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)
    setResolvedTheme(newTheme)
  }

  // Set theme
  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme)
    
    // Try to update profile if user is logged in (optional)
    try {
      const { useAuth } = await import('./AuthContext')
      const { profile, updateProfile } = useAuth()
      if (profile) {
        await updateProfile({ theme: newTheme })
      }
    } catch (error) {
      // Auth context not available, which is fine for public pages
      console.log('Auth context not available for theme update')
    }

    // Apply the theme
    if (newTheme === 'system') {
      const systemTheme = getSystemTheme()
      applyTheme(systemTheme)
    } else {
      applyTheme(newTheme)
    }
  }

  useEffect(() => {
    // Try to get initial theme from profile, fallback to system
    let initialTheme: Theme = 'system'
    
    try {
      const { useAuth } = require('./AuthContext')
      const { profile } = useAuth()
      initialTheme = profile?.theme || 'system'
    } catch (error) {
      // Auth context not available, use system default
      initialTheme = 'system'
    }

    setThemeState(initialTheme)

    if (initialTheme === 'system') {
      const systemTheme = getSystemTheme()
      applyTheme(systemTheme)
      
      // Listen for system theme changes
      if (typeof window !== 'undefined') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
          applyTheme(e.matches ? 'dark' : 'light')
        }
        
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
      }
    } else {
      applyTheme(initialTheme)
    }
  }, [])

  const value = {
    theme,
    setTheme,
    resolvedTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
} 