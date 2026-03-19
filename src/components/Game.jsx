import { useState, useEffect } from 'react'
import WordCard from './WordCard'
import WordInput from './WordInput'
import { GameStates } from '../utils/gameConstants';
import { getRandomWord, getHiddenLetters  } from '../utils/gameUtils';

const Game = () => {
    const [gameState, setGameState] = useState(GameStates.IDLE);
    const [word, setWord] = useState("");
    const [revealedLetters, setRevealedLetters] = useState([]);

    const startGame = () => {
        let newWord = getRandomWord();
        while (newWord === word)
            newWord = getRandomWord();
        setWord(newWord);
        setRevealedLetters(getHiddenLetters(newWord));
        setGameState(GameStates.PLAY);
    }

    useEffect(() => {
        if (gameState === GameStates.PLAY) {
            const interval = setInterval(() => {
                setRevealedLetters(prev => {
                    const hiddenIndexes = prev.reduce((acc, val, i) => {
                        if (!val) {
                            acc.push(i);
                        }
                        return acc;
                    }, []);

                    if (hiddenIndexes.length === 1) {
                        setGameState(GameStates.LOSE);
                        return prev;
                    } else {
                        const randomIndex = hiddenIndexes[Math.floor(Math.random() * hiddenIndexes.length)];
                        const newRevealedState = [...prev];
                        newRevealedState[randomIndex] = true;
                        return newRevealedState;
                    }
                });
            }, 3000);
            return () => clearInterval(interval);
            }        
    }, [gameState]);

    return (
        <div className="flex flex-col flex-1 justify-center items-center gap-8">
            <WordCard word={word} revealedLetters={revealedLetters} gameState={gameState} setGameState={setGameState} startGame={startGame}/>
            <WordInput word={word} gameState={gameState} setGameState={setGameState}/>
        </div>
    )
}

export default Game