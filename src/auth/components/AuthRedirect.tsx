'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'

interface AuthRedirectProps {
  children: React.ReactNode
}

export default function AuthRedirect({ children }: AuthRedirectProps) {
  const { user, loading, profileLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !profileLoading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, profileLoading, router])

  // Show loading while checking auth status
  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return <>{children}</>
}