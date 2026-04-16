import { useState } from 'react'
import { AuthContext } from './AuthContext'

const getStoredUser = () => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const userId = localStorage.getItem('userId')

  if (!token || !username) return null

  return { username, userId }
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser)

  const login = (token, userId, username) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    localStorage.setItem('username', username)
    setUser({ username, userId })
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    setUser(null)
  }

  const isLoggedIn = !!user

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
