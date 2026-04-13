import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar } from 'lucide-react'

function Profile() {
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        const data = await response.json()
        if (!response.ok) {
          navigate('/login')
          return
        }
        setUserData({
          username: data.username,
          createdAt: data.createdAt,
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchProfile()
  }, [navigate])

  if (!userData)
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-white border-t-transparent animate-spin" />
        <p className="text-white/60">Chargement...</p>
      </div>
    )

  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(userData.createdAt))

  return (
    <div className="flex flex-1 justify-center px-4 pt-15 sm:pt-30">
      <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center w-full h-80 border border-white/20 rounded-2xl gap-8 hover:-translate-y-0.5 transition-transform duration-200">
          <div className="flex items-center justify-center w-30 h-30 border-3 rounded-full bg-white/20 hover:bg-white/30 text-6xl transition-colors">
            {userData.username?.[0]?.toUpperCase()}
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-4xl font-bold">{userData.username}</p>
            <div className="flex items-center border border-white/20 rounded-full gap-2 px-3 py-2 text-sm">
              <Calendar size={14} />
              Membre depuis le {formattedDate}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {/* 4 cards */}
        </div>
      </div>
    </div>
  )
}

export default Profile
