import { useEffect, useRef } from 'react'
import WordButtons from './WordButtons'
import confetti from 'canvas-confetti'

const EndScreen = ({word, title, setGameState, startGame}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (title === "MOT TROUVÉ" && canvasRef.current) {
            const myConfetti = confetti.create(canvasRef.current, { resize: true });
            myConfetti({
                spread: 135,
                startVelocity: 35,
                gravity: 1.5,
            });
        }
    }, []);
    
    return (
        <>
            {title === "MOT TROUVÉ" && (
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                />
            )}
            <h2 className={`card-title ${title === "MOT TROUVÉ" ? "animate-title-win" : "animate-title-lose"}`}>{title}: {word}</h2>
                            
            <div className="font-extrabold lg:text-3xl pt-1">
                {title === "MOT TROUVÉ" ? "BRAVO !" : "PERDU !"}
            </div>
            
            <div className="flex justify-between w-full px-2 lg:px-4">
                <WordButtons setGameState={setGameState} startGame={startGame}/>
            </div>
        </>
    )
}

export default EndScreen