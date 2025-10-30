// Main exports for authentication system
export { useAuth, AuthProvider } from './hooks/useAuth'
export { default as AuthForm } from './components/AuthForm'
export { default as ProtectedRoute } from './components/ProtectedRoute'
export { default as LogoutButton } from './components/LogoutButton'
export { default as AuthRedirect } from './components/AuthRedirect'
export { supabase } from './utils/supabase'
export { getUserProfile, updateUserProfile, createUserProfile, checkProfileCompletion } from './utils/profile'
export type { UserProfile } from './utils/profile'