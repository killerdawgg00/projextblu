'use client'

import { RegisterPage } from '@/components/RegisterPage'
import { AuthProvider } from '@/contexts/AuthContext'

export default function Register() {
  return (
    <AuthProvider>
      <RegisterPage />
    </AuthProvider>
  )
} 