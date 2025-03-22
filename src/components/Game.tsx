import { useState } from "react";

import './Game.css';

function Game(props: any) {
    const [index, setIndex] = useState(0);

    const handleGuess = () => {
        if (index < props.list.length - 1) {
            setIndex(index + 1);
        }
    }

    return (
        <>
            <div>{props.list[index]['character']}</div>
            <div className='input'>
                <div className='input__button' onClick={handleGuess}>确认</div>
            </div>
        </>
    )
}

export default Game;
