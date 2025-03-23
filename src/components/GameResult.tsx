import { HistoryEntry } from '../lib/HistoryEntry';

import './GameResult.css';

function GameResult(props: any) {
  let numCorrect = 0;
  const total = props.result.length;

  for (let i = 0; i < props.result.length; i++) {
    if (props.result[i].character.readings.includes(props.result[i].guess)) {
      numCorrect++;
    }
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
      <button onClick={() => props.handleNewGame()}>Start</button>
    </div>
  );
}

export default GameResult;
