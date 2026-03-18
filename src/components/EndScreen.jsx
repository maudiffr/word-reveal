import WordButtons from './WordButtons'

const EndScreen = ({word, title, setGameState, startGame}) => {
    return (
        <>
            <h2 className="card-title">{title}: {word}</h2>
                            
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