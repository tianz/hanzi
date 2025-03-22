import { useState } from 'react';
import Game from '../components/Game';
import GameSetup from '../components/GameSetup';

import { CharacterList } from '../lib/CharacterList';

function MainPage() {
  const [status, setStatus] = useState('new-game');

  const handleGameStart = () => {
    setStatus('in-game');
  };

  return (
    <>
      <div className='page-container'>
        <div>汉字Go</div>
        {status === 'new-game' && <GameSetup onStart={handleGameStart}/>}
        {status === 'in-game' && <Game list={CharacterList} />}
      </div>
    </>
  );
}

export default MainPage;
