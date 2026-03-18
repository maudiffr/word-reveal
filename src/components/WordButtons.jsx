import { GameStates } from '../utils/gameConstants'
import { House } from 'lucide-react'
import { CornerDownRight } from 'lucide-react'

const WordButtons = ({setGameState, startGame}) => {
    return (
        <>
            <button 
                onClick={() => setGameState(GameStates.IDLE)}
                className="btn-end-state btn-anim"
            >
                <House className="w-5 h-5 lg:w-10 lg:h-10" strokeWidth={1.5}/>
                Menu
            </button>
            <button 
                onClick={() => startGame()}
                className="btn-end-state btn-anim"
            >
                <CornerDownRight size={24} strokeWidth={1.5}/>
                Mot suivant
            </button>
        </>
    )
};

export default WordButtons