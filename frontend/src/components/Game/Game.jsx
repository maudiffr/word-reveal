import WordCard from './WordCard'
import WordInput from './WordInput'

const Game = () => {
  return (
    <div className="flex flex-col flex-1 items-center gap-8 px-4 pt-45">
      <WordCard />
      <WordInput />
    </div>
  )
}

export default Game
