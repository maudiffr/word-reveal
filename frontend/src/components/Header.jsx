import { useAuth } from '../hooks/useAuth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { View } from 'lucide-react'

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-black">
      <nav className="flex items-center justify-between max-w-340 mx-auto px-8 py-3 whitespace-nowrap">
        <div className="flex items-center gap-12">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-semibold"
          >
            <View size={24} className="shrink-0" />
            Word Reveal
          </Link>
          <Link
            to="/leaderboard"
            className="text-white/60 hover:text-white transition-colors"
          >
            Classement
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center select-none gap-4">
            <Link
              to="/profile"
              className="flex items-center justify-center gap-3 font-medium"
            >
              <div className="flex items-center justify-center w-9 h-9 border-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                {user?.username?.[0]?.toUpperCase()}
              </div>
              <span className="text-xl">{user.username}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 border border-white/20 rounded-lg text-[13px] hover:bg-white/10 cursor-pointer whitespace-nowrap transition-colors"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 select-none">
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
