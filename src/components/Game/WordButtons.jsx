import { useGame } from '../../hooks/useGame'

const WordButtons = () => {
  const { resetGame, startGame } = useGame()

  return (
    <>
      <button
        onClick={() => resetGame()}
        className="btn-basic-style btn-end-state btn-anim"
      >
        Menu
      </button>
      <button
        onClick={() => startGame()}
        className="btn-basic-style btn-end-state btn-anim"
      >
        Rejouer
      </button>
    </>
  )
}

export default WordButtons
