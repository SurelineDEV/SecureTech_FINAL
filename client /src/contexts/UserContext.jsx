import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on initial load
    console.log('UserContext: Checking for stored user...')
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    
    if (storedUser && storedToken) {
      console.log('UserContext: Found stored user:', JSON.parse(storedUser))
      setUser(JSON.parse(storedUser))
    } else {
      console.log('UserContext: No stored user found')
    }
    
    setLoading(false)
  }, [])

  const login = (userData, token) => {
    console.log('UserContext: Logging in user:', userData)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const logout = () => {
    console.log('UserContext: Logging out user')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

