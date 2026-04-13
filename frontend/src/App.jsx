import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from '../src/context/AuthProvider'
import LayoutWithHeader from './layouts/LayoutWithHeader'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

// <Router> (BrowserRouter) — contexte global, intercepte les changements d'URL
//           via window.history.pushState(), empêche le rechargement navigateur.
//           Se met le plus haut possible dans l'arbre, une seule fois.
//
// <Routes> — switch qui compare l'URL actuelle avec toutes les <Route> définies
//            et affiche la première qui correspond.
//
// <Route path="/" element={<Home />} /> — règle de correspondance URL → composant.
//            path : l'URL à matcher
//            element : le composant à afficher si ça match
//
// <Route path="*" element={<NotFound />} /> — catch-all, matche tout ce qui
//            n'a pas été capturé au-dessus. Toujours en dernier.
//
// <Link to="/register"> — équivalent du <a href> mais sans rechargement.
//            Utilise pushState sous le capot.

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
  }, [])

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-[#171717] text-white">
        <Router>
          <Routes>
            <Route element={<LayoutWithHeader />}>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App
