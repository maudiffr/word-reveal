import { GameProvider } from '../../context/GameProvider'
import Game from '../../components/Game/Game'

function Home() {
  return (
    <>
      <GameProvider>
        <Game />
      </GameProvider>
    </>
  )
}

export default Home
