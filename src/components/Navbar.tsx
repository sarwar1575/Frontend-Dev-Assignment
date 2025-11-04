import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-sw-dark border-b border-sw-yellow/20 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-sw-yellow text-2xl">⭐</span>
            <h1 className="text-xl font-orbitron font-bold text-white">
              Star Wars Explorer
            </h1>
          </Link>
          
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-sw-yellow text-sw-dark font-poppins font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
