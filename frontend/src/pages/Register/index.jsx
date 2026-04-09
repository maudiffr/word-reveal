import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

function Register() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const form = e.target

    const formData = new FormData(form)

    const username = formData.get('username')
    const password = formData.get('password')

    console.log(`${username} et ${password}`)

    form.reset()
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
            className={`w-full lg:w-80 px-2 py-2 border border-white/20 rounded-lg bg-white/10 lg:text-lg outline-none focus:ring`}
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              aria-label="password"
              maxLength={20}
              className={`w-full lg:w-80 px-2 py-2 border border-white/20 bg-white/10 rounded-lg lg:text-lg outline-none focus:ring`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button
            type="submit"
            className="mt-15 px-3 py-2.5 rounded-lg bg-white text-lg text-black font-medium hover:bg-white/80 transition-colors select-none cursor-pointer"
          >
            S'inscrire
          </button>
        </form>
        <div>
          Déja un compte ?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Connexion
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
