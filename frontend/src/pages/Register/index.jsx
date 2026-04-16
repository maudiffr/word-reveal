import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Eye, EyeOff } from 'lucide-react'

function Register() {
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.target)
    const username = formData.get('username')
    const password = formData.get('password')

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        },
      )
      const data = await response.json()
      if (!response.ok) {
        setError(data.error)
        return
      }
      setError('')
      login(data.token, data.userId, data.username)
      navigate('/')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-1 justify-center px-4 pt-15 sm:pt-30">
      <div className="grid grid-rows-[20%_60%_20%] place-items-center w-full max-w-lg h-130 border border-white/20 rounded-2xl">
        <div>
          <h1 className="text-3xl font-semibold">Inscription</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            name="username"
            type="text"
            id="username"
            placeholder="Username"
            aria-label="username"
            maxLength={16}
            className="w-full lg:w-80 px-2 py-2 border border-white/20 rounded-lg bg-white/10 lg:text-lg outline-none focus:ring"
            required
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              aria-label="password"
              maxLength={20}
              className="w-full lg:w-80 px-2 py-2 border border-white/20 bg-white/10 rounded-lg lg:text-lg outline-none focus:ring"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="min-h-9 self-center flex items-center justify-center">
            {isLoading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              error && <p className="text-red-400 text-sm">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-3 py-2.5 rounded-lg bg-white text-lg text-black font-medium hover:bg-white/80 transition-colors select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50"
          >
            S'inscrire
          </button>
        </form>
        <div>
          Déjà un compte ?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Connexion
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
