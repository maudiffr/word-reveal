import words from '../data/words.json'

export function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

export function getHiddenLetters(word) {
  const arr = Array(word.length).fill(false)

  const randomIndex = Math.floor(Math.random() * word.length)
  arr[randomIndex] = true

  return arr
}
