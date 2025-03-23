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
      seed: props.seed,
      playerName: props.playerName,
      guesses: props.result.map((value: HistoryEntry) => value.guess),
      numCorrect: numCorrect,
    };

    const base = window.location.host + window.location.pathname + '?battleId=';
    navigator.clipboard.writeText(base + btoa(unescape(encodeURIComponent(JSON.stringify(battleId)))));
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };

  return (
    <div className='game-result'>
      {props.opponentResult == null ? (
        <div>
          Score: {`${numCorrect} / ${total}`}
          <div>
            {props.result.map((value: HistoryEntry, index: number) => (
              <div key={index}>
                {`${value.character.character} (${value.character.readings.join(', ')})`}:{' '}
                <span className={`${value.isCorrect ? 'correct' : 'incorrect'}`}>{value.guess}</span>
              </div>
            ))}
          </div>
          <a className='share' onClick={handleShareLink}>
            点击此处复制链接分享给好友
          </a>
          <button onClick={() => props.handleNewGame()}>Start</button>
          {showPopup && (
            <div className='popup'>
              <p>链接已复制</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>{props.playerName}</th>
                <th>{props.opponentResult.playerName}</th>
              </tr>
              <tr>
                <td>得分</td>
                <td>{`${numCorrect} / ${total}`}</td>
                <td>{`${props.opponentResult.numCorrect} / ${total}`}</td>
              </tr>
              {props.result.map((value: HistoryEntry, index: number) => (
                <tr key={index}>
                  <td>{`${value.character.character} (${value.character.readings.join(', ')})`}</td>
                  <td>
                    <span className={`${value.isCorrect ? 'correct' : 'incorrect'}`}>{value.guess}</span>
                  </td>
                  <td>
                    <span
                      className={value.character.readings.includes(props.opponentResult.guesses[index]) ? 'correct' : 'incorrect'}
                    >
                      {props.opponentResult.guesses[index]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GameResult;
