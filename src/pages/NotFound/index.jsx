import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>404</h1>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}
export default NotFound
