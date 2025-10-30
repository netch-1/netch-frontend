'use client'

import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/navigation'

interface LogoutButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function LogoutButton({ className = '', children }: LogoutButtonProps) {
  const { signOut } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className={`text-red-600 hover:text-red-700 ${className}`}
    >
      {children || 'Sign Out'}
    </button>
  )
}