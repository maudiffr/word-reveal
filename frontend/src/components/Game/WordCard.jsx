import { GameStates } from '../../utils/gameConstants'
import { Play } from 'lucide-react'
import WordGrid from './WordGrid'
import EndScreen from './EndScreen'
import { useGame } from '../../hooks/useGame'

const WordCard = () => {
  const { gameState, startGame } = useGame()

  const renderContent = () => {
    switch (gameState) {
      case GameStates.IDLE:
        return (
          <div className="row-span-3">
            <button
              onClick={startGame}
              className="group btn-basic-style gap-4 pl-5 lg:pl-8 pr-7 lg:pr-11.25 py-4 lg:py-6 rounded-[30px] text-3xl lg:text-5xl btn-anim"
            >
              <Play
                fill="white"
                strokeWidth={0}
                className="w-7.5 h-7.5 lg:w-11 lg:h-11 group-hover:fill-black"
              />
              Jouer
            </button>
          </div>
        )
      case GameStates.PLAY:
        return (
          <>
            <h2 className="game-card-title">TROUVER LE MOT</h2>

            <div className="flex justify-center items-center gap-1 lg:gap-2">
              <WordGrid />
            </div>

            <p className="self-start text-sm lg:text-2xl font-semibold opacity-45 italic">
              TROUVEZ LE MOT AVANT QU'IL NE SOIT RÉVÉLÉ
            </p>
          </>
        )
      case GameStates.WIN:
        return <EndScreen title="MOT TROUVÉ" />
      case GameStates.LOSE:
        return <EndScreen title="MOT RÉVÉLÉ" />
    }
  }

  return (
    <div
      className="game-card
                bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_2px,transparent_3px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_2px,transparent_3px)]
                bg-size-[20px_20px] lg:bg-size-[36px_36px]
                shadow-[inset_0_0_30px_rgba(255,255,255,0.15)]"
    >
      {renderContent()}
    </div>
  )
}

export default WordCard
