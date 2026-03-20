import { GameStates } from '../utils/gameConstants'
import { Play } from 'lucide-react'
import WordGrid from './WordGrid'
import EndScreen from './EndScreen';

const WordCard = ({word, revealedLetters, gameState, setGameState, startGame }) => {
    const renderContent = () => {
        switch (gameState) {
            case GameStates.IDLE:
                return (
                    <div className="row-span-3">
                        <button 
                            onClick={() => startGame()}
                            className="btn-basic-style gap-3 px-6 py-5 rounded-3xl text-5xl btn-anim"
                        >
                            <Play size={48} strokeWidth={1.5}/>
                            Jouer
                        </button>
                    </div>
                )
            case GameStates.PLAY:
                return (
                    <>
                        <h2 className="card-title">TROUVER LE MOT</h2>
                        
                        <div className="flex justify-center items-center gap-1 lg:gap-2">
                            <WordGrid word={word} revealedLetters={revealedLetters}/>
                        </div>
                        
                        <p className="self-start text-sm lg:text-2xl font-semibold opacity-45 italic">TROUVEZ LE MOT AVANT QU'IL NE SOIT RÉVÉLÉ</p>
                    </>
                )
            case GameStates.WIN:
                return (
                    <EndScreen word={word} title="MOT TROUVÉ" setGameState={setGameState} startGame={startGame}/>
                )
            case GameStates.LOSE:
                return (
                    <EndScreen word={word} title="MOT RÉVÉLÉ" setGameState={setGameState} startGame={startGame}/>
                )    
        }
    }
    
    return (
        <div
            className="card
                bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_2px,transparent_3px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_2px,transparent_3px)]
                bg-size-[20px_20px] lg:bg-size-[36px_36px]
                shadow-[inset_0_0_30px_rgba(255,255,255,0.15)]"
        >
            {renderContent()}
        </div>
    )
};

export default WordCard