import WordCard from './WordCard'
import WordInput from './WordInput'

const Game = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-8">
      <WordCard />
      <WordInput />
    </div>
  )
}

export default Game
