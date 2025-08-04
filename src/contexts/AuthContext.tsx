'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']
type UserSettings = Database['public']['Tables']['user_settings']['Row']

interface AuthContextType {
  user: User | null
  profile: Profile | null
  settings: UserSettings | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
  updateSettings: (updates: Partial<UserSettings>) => Promise<{ error: any }>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Optimized data fetching with parallel requests
  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile and settings in parallel for faster loading
      const [profileResult, settingsResult] = await Promise.allSettled([
        supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single(),
        supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', userId)
          .single()
      ])

      // Handle profile data
      if (profileResult.status === 'fulfilled' && profileResult.value.data) {
        setProfile(profileResult.value.data)
      } else if (profileResult.status === 'rejected' || !profileResult.value.data) {
        // Create profile if it doesn't exist
        const { data: newProfile } = await supabase
          .from('profiles')
          .insert([
            {
              id: userId,
              email: user?.email || '',
              theme: 'system'
            }
          ])
          .select()
          .single()

        if (newProfile) {
          setProfile(newProfile)
        }
      }

      // Handle settings data
      if (settingsResult.status === 'fulfilled' && settingsResult.value.data) {
        setSettings(settingsResult.value.data)
      } else if (settingsResult.status === 'rejected' || !settingsResult.value.data) {
        // Create settings if they don't exist
        const { data: newSettings } = await supabase
          .from('user_settings')
          .insert([
            {
              user_id: userId,
              notifications_enabled: true,
              email_notifications: true,
              dashboard_layout: 'grid',
              security_level: 'medium'
            }
          ])
          .select()
          .single()

        if (newSettings) {
          setSettings(newSettings)
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      // Continue with loading even if there's an error
    }
  }

  useEffect(() => {
    let mounted = true

    // Get initial session with timeout
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!mounted) return

        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUserData(session.user.id)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    getInitialSession()

    // Listen for auth changes with optimized handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          // Set loading to false immediately for better UX
          setLoading(false)
          // Fetch user data in background
          fetchUserData(session.user.id)
        } else {
          setProfile(null)
          setSettings(null)
          setLoading(false)
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } finally {
      // Don't set loading to false here - let the auth state change handle it
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      return { error }
    } finally {
      // Don't set loading to false here - let the auth state change handle it
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (!error && data) {
      setProfile(data)
    }

    return { error }
  }

  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!user) return { error: new Error('No user logged in') }

    const { data, error } = await supabase
      .from('user_settings')
      .update(updates)
      .eq('user_id', user.id)
      .select()
      .single()

    if (!error && data) {
      setSettings(data)
    }

    return { error }
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }

  const value = {
    user,
    profile,
    settings,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    updateSettings,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 