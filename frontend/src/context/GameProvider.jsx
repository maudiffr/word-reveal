import { useState, useEffect } from 'react'
import { GameStates } from '../utils/gameConstants'
import { GameContext } from './GameContext'
import { getRandomWord, getHiddenLetters } from '../utils/gameUtils'

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(GameStates.IDLE)
  const [word, setWord] = useState('')
  const [revealedLetters, setRevealedLetters] = useState([])

  const startGame = () => {
    let newWord = getRandomWord()
    while (newWord === word) newWord = getRandomWord()
    setWord(newWord)
    setRevealedLetters(getHiddenLetters(newWord))
    setGameState(GameStates.PLAY)
  }

  const submitGuess = (guess) => {
    if (guess === word) setGameState(GameStates.WIN)
  }

  const revealRandomLetter = () => {
    setRevealedLetters((prev) => {
      const hiddenIndexes = prev.reduce((acc, val, i) => {
        if (!val) {
          acc.push(i)
        }
        return acc
      }, [])

      if (hiddenIndexes.length <= 1) {
        setGameState(GameStates.LOSE)
        return prev
      } else {
        const randomIndex =
          hiddenIndexes[Math.floor(Math.random() * hiddenIndexes.length)]
        const newRevealedState = [...prev]
        newRevealedState[randomIndex] = true
        return newRevealedState
      }
    })
  }

  useEffect(() => {
    if (gameState !== GameStates.PLAY) return

    const interval = setInterval(revealRandomLetter, 10000)

    return () => clearInterval(interval)
  }, [gameState])

  const resetGame = () => {
    setGameState(GameStates.IDLE)
    setWord('')
    setRevealedLetters([])
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        word,
        revealedLetters,
        startGame,
        submitGuess,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
