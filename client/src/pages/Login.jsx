import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Shield, AlertTriangle } from 'lucide-react'

// Backend API URL - use relative path when deployed together
const API_URL = '/api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useUser()

  console.log('Login: Component rendered')

  // Demo login function
  const setLoginDemo = (role) => {
    console.log(`Login: Setting demo credentials for ${role}`)
    if (role === 'admin') {
      setEmail('admin@securetech.com')
      setPassword('admin123')
    } else if (role === 'officer') {
      setEmail('officer@securetech.com')
      setPassword('officer123')
    } else if (role === 'client') {
      setEmail('client@securetech.com')
      setPassword('client123')
    }
  }

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('Login: Attempting login for:', email)
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json()
      console.log('Login: API response:', data)
      
      if (data.success) {
        console.log('Login: Success! User data:', data.user)
        console.log('Login: Calling context login function...')
        login(data.user, data.token)
        console.log('Login: Redirecting to dashboard...')
        navigate('/dashboard', { replace: true })
      } else {
        console.log('Login: Failed:', data.message)
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      console.error('Login: Network error:', err)
      setError('Network error. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-yellow-500">SecureTech</CardTitle>
          <CardDescription className="text-slate-300">
            Modern Tools for the Modern Guard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Demo Login Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Button 
              onClick={() => setLoginDemo('admin')}
              variant="outline"
              className="bg-yellow-500 text-slate-900 border-yellow-500 hover:bg-yellow-600"
            >
              ADMIN
            </Button>
            <Button 
              onClick={() => setLoginDemo('officer')}
              variant="outline"
              className="bg-yellow-500 text-slate-900 border-yellow-500 hover:bg-yellow-600"
            >
              OFFICER
            </Button>
            <Button 
              onClick={() => setLoginDemo('client')}
              variant="outline"
              className="bg-yellow-500 text-slate-900 border-yellow-500 hover:bg-yellow-600"
            >
              CLIENT
            </Button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                required
              />
            </div>
            
            {error && (
              <Alert className="bg-red-900 border-red-700">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-yellow-500 text-slate-900 hover:bg-yellow-600"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'SIGN IN'}
            </Button>
          </form>

          <div className="text-center space-x-4 text-sm">
            <a href="#" className="text-yellow-500 hover:text-yellow-400">Forgot Password?</a>
            <a href="#" className="text-yellow-500 hover:text-yellow-400">Forgot Username?</a>
          </div>

          <div className="text-center text-xs text-slate-400 mt-6">
            © 2025 SecureTech. All rights reserved. |{' '}
            <a href="#" className="text-yellow-500 hover:text-yellow-400">Terms of Use</a> |{' '}
            Confidential Proprietary Software
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login

