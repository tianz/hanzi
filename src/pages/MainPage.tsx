import { useState } from 'react';

import Game from '../components/Game';
import GameSetup from '../components/GameSetup';

import { CharacterList } from '../lib/CharacterList';

import './MainPage.css';

function MainPage() {
  const [status, setStatus] = useState('new-game');
  const [characters, setCharacters] = useState([]);

  const handleGameStart = (characters) => {
    console.log(`New game with ${characters.length} questions`);
    setCharacters(characters);
    setStatus('in-game');
  };

  return (
    <>
      <div className='page-container'>
        <div className='title'>
          汉字<span>GO!</span>
        </div>
        {status === 'new-game' && <GameSetup handleGameStart={handleGameStart} />}
        {status === 'in-game' && <Game characters={characters} />}
      </div>
    </>
  );
}

export default MainPage;
