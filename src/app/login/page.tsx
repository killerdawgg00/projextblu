'use client'

import { LoginPage } from '@/components/LoginPage'
import { AuthProvider } from '@/contexts/AuthContext'

export default function Login() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  )
} 