import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Gamepad2, CirclePercent } from 'lucide-react'

function Leaderboard() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/leaderboard`,
        )
        const data = await response.json()
        if (!response.ok) return
        setUsers(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLeaderboard()
  }, [])

  if (!users)
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-white border-t-transparent animate-spin" />
        <p className="text-white/60">Chargement...</p>
      </div>
    )

  return (
    <div className="flex flex-1 justify-center px-4 pt-8 sm:pt-16">
      <div className="flex flex-col items-center gap-8 w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-5">Classement</h1>
        <div className="flex flex-col w-full gap-3">
          {users.map((user, index) => {
            const winrate = user.gamesPlayed
              ? Math.round((user.gamesWon / user.gamesPlayed) * 100) + ' %'
              : '0 %'
            return (
              <div
                key={index}
                className="flex items-center justify-between px-6 h-20 border border-white/20 rounded-2xl bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-white/40 w-6">
                    {index + 1}
                  </span>
                  <div className="flex items-center justify-center w-10 h-10 border border-white/20 rounded-full bg-white/10 text-lg font-bold">
                    {user.username[0].toUpperCase()}
                  </div>
                  <p className="text-lg font-medium">
                    <Link to={`/profile/${user.username}`}>
                      {user.username}
                    </Link>
                  </p>
                </div>
                <div className="flex items-center gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-2 w-10 sm:w-16">
                    <Gamepad2 size={16} />
                    <span>{user.gamesPlayed}</span>
                  </div>
                  <div className="flex items-center gap-2 w-10 sm:w-16">
                    <Trophy size={16} />
                    <span>{user.gamesWon}</span>
                  </div>
                  <div className="flex items-center gap-2 w-16">
                    <CirclePercent size={16} />
                    <span>{winrate}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
