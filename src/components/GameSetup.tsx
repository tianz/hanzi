import { useState } from 'react';

import './GameSetup.css';

function GameSetup(props: any) {
  const questionCounts = [50, 100, 200];

  const [questionCount, setQuestionCount] = useState(0);

  const selectQuestionCount = (index: number) => {
    console.log(index);
    setQuestionCount(questionCounts[index]);
  };

  const handleGameStart = () => {
    props.handleGameStart(questionCount);
  };

  return (
    <div className='setup'>
      <div className='title'>新游戏</div>
      <div>题目数量</div>
      <div className='input__option-container'>
        {questionCounts.map((option, index) => (
          <div className='input__option' key={index} onClick={() => selectQuestionCount(index)}>
            {option}
          </div>
        ))}
      </div>
      <button onClick={handleGameStart}>Start</button>
    </div>
  );
}

export default GameSetup;
