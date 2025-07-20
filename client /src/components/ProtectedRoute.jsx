import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser()

  console.log('ProtectedRoute: Checking access...', { user: user?.email, loading })

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    console.log('ProtectedRoute: No user found, redirecting to login')
    return <Navigate to="/login" replace />
  }

  console.log('ProtectedRoute: User authenticated, rendering protected content')
  return children
}

export default ProtectedRoute

