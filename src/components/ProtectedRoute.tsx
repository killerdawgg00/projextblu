'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Shield, Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    if (!loading && !user && !redirecting) {
      setRedirecting(true)
      router.push('/login')
    }
  }, [user, loading, router, redirecting])

  // Show loading spinner for initial load
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-700 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-teal-500 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <div className="mt-6 flex items-center justify-center space-x-2">
            <Shield className="w-5 h-5 text-teal-400" />
            <p className="text-gray-300 font-medium">Initializing Sentinel AI...</p>
          </div>
          <p className="mt-2 text-gray-500 text-sm">Loading your security dashboard</p>
        </div>
      </div>
    )
  }

  // Show loading spinner while redirecting
  if (redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
          <p className="mt-4 text-gray-300">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if no user
  if (!user) {
    return null
  }

  return <>{children}</>
} 