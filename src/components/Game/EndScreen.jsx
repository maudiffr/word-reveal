import { useEffect, useRef } from 'react'
import WordButtons from './WordButtons'
import confetti from 'canvas-confetti'
import { useGame } from '../../hooks/useGame'
import { GameStates } from '../../utils/gameConstants'

const EndScreen = ({ title }) => {
  const { word, gameState } = useGame()
  const canvasRef = useRef(null)
  const isWin = gameState === GameStates.WIN

  useEffect(() => {
    if (title === 'MOT TROUVÉ' && canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, { resize: true })
      myConfetti({
        spread: 135,
        startVelocity: 35,
        gravity: 1.5,
      })
    }
  }, [title])

  return (
    <>
      {isWin && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      )}
      <h2
        className={`game-card-title ${isWin ? 'animate-title-win' : 'animate-title-lose'}`}
      >
        {title} : {word}
      </h2>

      <div className="font-extrabold lg:text-3xl pt-1">
        {isWin ? 'BRAVO !' : 'PERDU !'}
      </div>

      <div className="flex justify-between w-full px-2 lg:px-4">
        <WordButtons />
      </div>
    </>
  )
}

export default EndScreen
