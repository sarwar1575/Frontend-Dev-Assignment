import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (login(username, password)) {
      navigate('/')
    } else {
      setError('Invalid credentials. Use admin/admin')
    }
  }

  return (
    <div className="min-h-screen bg-sw-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-orbitron font-bold text-sw-yellow mb-2">
            Star Wars Explorer
          </h1>
          <p className="text-sw-gray font-poppins">Enter your credentials</p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700"
        >
          <div className="mb-6">
            <label className="block text-white font-poppins mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-sw-yellow focus:ring-2 focus:ring-sw-yellow/20 font-poppins"
              placeholder="admin"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-poppins mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-sw-yellow focus:ring-2 focus:ring-sw-yellow/20 font-poppins"
              placeholder="admin"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-300 text-sm font-poppins"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-sw-yellow text-sw-dark font-poppins font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
          >
            Login
          </button>

          <div className="mt-4 text-center text-sw-gray text-sm font-poppins">
            <p>Demo credentials: admin / admin</p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}
