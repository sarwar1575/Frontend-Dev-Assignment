import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
  refreshToken: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USERNAME = 'admin'
const MOCK_PASSWORD = 'admin'
const TOKEN_KEY = 'sw_token'
const TOKEN_EXPIRY_KEY = 'sw_token_expiry'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY)
    const storedExpiry = localStorage.getItem(TOKEN_EXPIRY_KEY)

    if (storedToken && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10)
      if (Date.now() < expiryTime) {
        setToken(storedToken)
        setIsAuthenticated(true)
        scheduleRefresh(expiryTime - Date.now())
      } else {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(TOKEN_EXPIRY_KEY)
      }
    }
  }, [])

  const generateToken = (): string => {
    return `mock_jwt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const scheduleRefresh = (timeUntilExpiry: number) => {
    if (timeUntilExpiry > 0) {
      setTimeout(() => {
        refreshToken()
      }, timeUntilExpiry - 60000)
    }
  }

  const login = (username: string, password: string): boolean => {
    if (username === MOCK_USERNAME && password === MOCK_PASSWORD) {
      const newToken = generateToken()
      const expiryTime = Date.now() + 3600000

      setToken(newToken)
      setIsAuthenticated(true)
      localStorage.setItem(TOKEN_KEY, newToken)
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())

      scheduleRefresh(3600000)

      return true
    }
    return false
  }

  const logout = () => {
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_EXPIRY_KEY)
  }

  const refreshToken = () => {
    if (isAuthenticated) {
      const newToken = generateToken()
      const expiryTime = Date.now() + 3600000

      setToken(newToken)
      localStorage.setItem(TOKEN_KEY, newToken)
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())

      scheduleRefresh(3600000)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
