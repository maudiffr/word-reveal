const getLetterState = (isRevealed) => ({
  container: isRevealed
    ? 'items-center bg-white text-black animate-reveal'
    : 'items-end bg-[#171717] text-white',
  span: isRevealed
    ? 'text-xl lg:text-5xl font-bold'
    : 'text-3xl lg:text-6xl lg:font-light',
})

const WordGrid = ({ word, revealedLetters }) => {
  return (
    <>
      {word.split('').map((letter, index) => {
        const letterState = getLetterState(revealedLetters[index])
        return (
          <div
            key={index}
            className={`flex transition-colors duration-400 ${letterState.container} justify-center w-6.75 h-8 lg:w-12.5 lg:h-15 border-2 lg:border-3 border-white rounded-md lg:rounded-lg`}
          >
            <span className={letterState.span}>
              {revealedLetters[index] ? letter : '_'}
            </span>
          </div>
        )
      })}
    </>
  )
}

export default WordGrid
