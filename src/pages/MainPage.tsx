import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Game from '../components/Game';
import GameResult from '../components/GameResult';
import GameSetup from '../components/GameSetup';

import { Character } from '../lib/CharacterList';
import { HistoryEntry } from '../lib/HistoryEntry';

import './MainPage.css';

function MainPage() {
  const [status, setStatus] = useState('new-game');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [result, setResult] = useState<HistoryEntry[]>();
  const [seed, setSeed] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const battleId = queryParams.get('battleId') || '';

  useEffect(() => {
    if (battleId !== '') {
      setSeed(JSON.parse(decodeURIComponent(escape(atob(battleId)))).seed);
    } else {
      setSeed(Math.floor(Math.random() * 9999999999999));
    }
  }, []);

  const handleNewGame = () => {
    setStatus('new-game');
  };

  const handleGameStart = (characters: Character[]) => {
    console.log(`New game with ${characters.length} questions`);
    setCharacters(characters);
    setStatus('in-game');
  };

  const handleGameEnd = (history: HistoryEntry[]) => {
    setStatus('game-result');
    setResult(history);
  };

  return (
    <>
      <div className='page-container'>
        <div className='title'>
          汉字<span>G0!</span>
        </div>
        <div>{battleId}</div>
        {status === 'new-game' && <GameSetup seed={seed} opponentResult={battleId !== '' ? JSON.parse(decodeURIComponent(escape(atob(battleId)))) : null} handleGameStart={handleGameStart} />}
        {status === 'in-game' && <Game characters={characters} handleGameEnd={handleGameEnd} />}
        {status === 'game-result' && <GameResult result={result} seed={seed} handleNewGame={handleNewGame} />}
      </div>
    </>
  );
}

export default MainPage;
