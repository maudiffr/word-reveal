import { useRef, useEffect } from 'react'
import { GameStates } from '../utils/gameConstants'

const WordInput = ({word, gameState, setGameState}) => {
   
    const inputRef = useRef(null);

    useEffect(() => {
        if (gameState === GameStates.PLAY)
            inputRef.current?.focus();
        if (inputRef.current)
            inputRef.current.value = "";
    }, [gameState]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const form = e.target;

        const formData = new FormData(form);

        const guess = formData.get("guess")?.toUpperCase();

        if (guess === word) {
            setGameState(GameStates.WIN);
        }
        
        form.reset();
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-stretch text-white">
            <input
                name="guess"
                type="text"
                id="guess"
                aria-label="Entrez votre réponse"
                maxLength={20}
                className="w-60 lg:w-80 mx-4 px-4 border border-white rounded-lg text-base lg:text-xl caret-green-500 outline-none bg-transparent focus:ring"
                disabled={gameState !== GameStates.PLAY}
                ref={inputRef}
            />
            <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-green-500 text-lg lg:text-2xl hover:bg-green-600 btn-anim"
                disabled={gameState !== GameStates.PLAY}
            >
                Envoyer
            </button>
        </form>       
    )
};

export default WordInput