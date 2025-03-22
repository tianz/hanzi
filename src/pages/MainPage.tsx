import { useState } from 'react';

import Game from '../components/Game';
import GameResult from '../components/GameResult';
import GameSetup from '../components/GameSetup';

import { Character } from '../lib/CharacterList';
import { GameResultType } from '../lib/GameResultType';

import './MainPage.css';

function MainPage() {
  const [status, setStatus] = useState('new-game');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [result, setResult] = useState<GameResultType>();

  const handleNewGame = () => {
    setStatus('new-game');
  };

  const handleGameStart = (characters: Character[]) => {
    console.log(`New game with ${characters.length} questions`);
    setCharacters(characters);
    setStatus('in-game');
  };

  const handleGameEnd = (result: GameResultType) => {
    setStatus('game-result');
    setResult(result);
  };

  return (
    <>
      <div className='page-container'>
        <div className='title'>
          汉字<span>G7!</span>
        </div>
        {status === 'new-game' && <GameSetup handleGameStart={handleGameStart} />}
        {status === 'in-game' && <Game characters={characters} handleGameEnd={handleGameEnd} />}
        {status === 'game-result' && <GameResult result={result} handleNewGame={handleNewGame} />}
      </div>
    </>
  );
}

export default MainPage;
