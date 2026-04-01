import { Link } from 'react-router-dom'
import { View } from 'lucide-react'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-2 px-4">
      <div className="flex items-center gap-2 mb-10">
        <View size={24} />
        <h1 className="text-2xl font-semibold">Word Reveal</h1>
      </div>
      <h2 className="text-4xl text-[#c2c0b6]">Page introuvable</h2>
      <h3 className="text-center text-[#9c9992]">
        La page que vous cherchez n'existe pas encore dans cet univers.
      </h3>
      <Link
        to="/"
        className="mt-4 px-4 py-2 rounded-xl bg-white text-sm text-black font-medium hover:bg-white/80 hover:scale-101 whitespace-nowrap transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}
export default NotFound
