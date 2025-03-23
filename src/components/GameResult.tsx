import { useState } from 'react';
import { HistoryEntry } from '../lib/HistoryEntry';

import './GameResult.css';

function GameResult(props: any) {
  const [showPopup, setShowPopup] = useState(false);

  let numCorrect = 0;
  const total = props.result.length;

  for (let i = 0; i < props.result.length; i++) {
    if (props.result[i].character.readings.includes(props.result[i].guess)) {
      numCorrect++;
    }
  }

  const handleShareLink = () => {
    const battleId = {
      'seed': props.seed,
      'guesses': props.result.map((value, index) => value.guess),
    };

    navigator.clipboard.writeText(JSON.stringify(battleId));
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  }

  return (
    <div className='game-result'>
      Score: {`${numCorrect} / ${total}`}
      <div>
        {props.result.map((value: HistoryEntry, index: number) => (
          <div key={index}>
            {`${value.character.character} (${value.character.readings.join(', ')})`}:{' '}
            <span className={`${value.isCorrect ? 'correct' : 'incorrect'}`}>{value.guess}</span>
          </div>
        ))}
      </div>
      <a className='share' onClick={handleShareLink}>点击此处复制链接分享给好友</a>
      {/* JSON: {JSON.stringify({'seed': props.seed, 'guesses': props.result.map((value, index)=> value.guess)})}
      ID: {btoa(unescape(encodeURIComponent(JSON.stringify({'seed': props.seed, 'guesses': props.result.map((value, index)=> value.guess)}))))} */}
      <button onClick={() => props.handleNewGame()}>Start</button>

      {showPopup && (
        <div className='popup'>
          <p>链接已复制</p>
        </div>
      )}
    </div>
  );
}

export default GameResult;
