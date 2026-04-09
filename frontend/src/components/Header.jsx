import { useAuth } from '../hooks/useAuth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { View } from 'lucide-react'

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <header className="bg-black">
      <nav className="grid grid-cols-3 items-center max-w-360 mx-auto px-8 py-3 whitespace-nowrap">
        <Link to="/" className="flex items-center gap-2 text-2xl font-semibold">
          <View size={24} className="shrink-0" />
          Word Reveal
        </Link>
        <div></div>
        {isLoggedIn ? (
          <div className="flex items-center justify-end select-none gap-3">
            <Link
              to="/profile"
              className="flex items-center justify-center w-9 h-9 border-2 rounded-full bg-white/20 text-sm font-medium hover:bg-white/30 transition-colors"
            >
              M
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 border border-white/20 rounded-lg text-[15px] hover:bg-white/10 whitespace-nowrap transition-colors"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-3 select-none">
            {location.pathname !== '/login' && (
              <Link
                to="/login"
                className="px-3 py-1.5 border border-white/20 rounded-lg text-[15px] hover:bg-white/10 whitespace-nowrap transition-colors"
              >
                Connexion
              </Link>
            )}
            {location.pathname !== '/register' && (
              <Link
                to="/register"
                className="px-3 py-1.5 border rounded-lg bg-white text-[15px] text-black hover:bg-white/80 whitespace-nowrap transition-colors"
              >
                Inscription
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
