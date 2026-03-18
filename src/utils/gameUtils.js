import words from "../data/words.json"

export function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

export function getHiddenLetters(word) {
    return Array(word.length).fill(false)
}