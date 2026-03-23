import { GameStates } from '../utils/gameConstants'

const WordButtons = ({ setGameState, startGame }) => {
  return (
    <>
      <button
        onClick={() => setGameState(GameStates.IDLE)}
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
