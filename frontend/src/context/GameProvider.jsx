import { useState, useEffect, useRef } from 'react'
import { GameStates } from '../utils/gameConstants'
import { GameContext } from './GameContext'
import { getRandomWord, getHiddenLetters } from '../utils/gameUtils'

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(GameStates.IDLE)
  const [word, setWord] = useState('')
  const [revealedLetters, setRevealedLetters] = useState([])

  const startGame = () => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
    let newWord = getRandomWord()
    while (newWord === word) newWord = getRandomWord()
    setWord(newWord)
    setRevealedLetters(getHiddenLetters(newWord))
    setGameState(GameStates.PLAY)
  }

  const submitGuess = (guess) => {
    if (guess === word) {
      setGameState(GameStates.WIN)
      return true
    }
    return false
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

  const timeoutRef = useRef(null)

  useEffect(() => {
    if (gameState !== GameStates.PLAY) return

    const scheduleNext = (delay) => {
      timeoutRef.current = setTimeout(() => {
        revealRandomLetter()
        scheduleNext(10000)
      }, delay)
    }

    scheduleNext(20000)

    return () => clearTimeout(timeoutRef.current)
  }, [gameState])

  const resetGame = () => {
    setGameState(GameStates.IDLE)
    setWord('')
    setRevealedLetters([])
  }

  useEffect(() => {
    if (gameState !== GameStates.WIN && gameState !== GameStates.LOSE) return
    const token = localStorage.getItem('token')
    if (!token) return

    fetch(`${import.meta.env.VITE_API_URL}/api/user/stats`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ won: gameState === GameStates.WIN }),
    })
  }, [gameState])

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
