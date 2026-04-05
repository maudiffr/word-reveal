import { Link, useLocation } from 'react-router-dom'
import { View } from 'lucide-react'

const Header = () => {
  const location = useLocation()

  return (
    <header className="bg-black">
      <nav className="grid grid-cols-3 items-center max-w-360 mx-auto px-8 py-3 whitespace-nowrap">
        <Link to="/" className="flex items-center gap-2 text-2xl font-semibold">
          <View size={24} className="shrink-0" />
          Word Reveal
        </Link>
        <div></div>
        <div className="flex items-center justify-end gap-3 select-none">
          {location.pathname !== '/login' && (
            <Link
              to="/login"
              className="px-3 py-1.5 border border-white/20 rounded-lg text-[15px] hover:bg-white/10 whitespace-nowrap transition-colors"
            >
              Log In
            </Link>
          )}
          {location.pathname !== '/register' && (
            <Link
              to="/register"
              className="px-3 py-1.5 rounded-lg bg-white text-[15px] text-black hover:bg-white/80 whitespace-nowrap transition-colors"
            >
              Sign Up
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
