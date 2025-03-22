import { useState } from 'react';

import './GameSetup.css';

function GameSetup(props: any) {
  const questionCounts = [50, 100, 200];

  const [questionCountIndex, setQuestionCountIndex] = useState(-1);

  const selectQuestionCount = (index: number) => {
    setQuestionCountIndex(index);
  };

  const handleGameStart = () => {
    if (questionCountIndex >= 0) {
      props.handleGameStart(questionCounts[questionCountIndex]);
    }
  };

  return (
    <div className='setup'>
      <div className='title'>新游戏</div>
      <div>题目数量</div>
      <div className='input__option-container'>
        {questionCounts.map((option, index) => (
          <div
            className={`input__option ${questionCountIndex == index ? 'input__option--selected' : ''}`}
            key={index}
            onClick={() => selectQuestionCount(index)}
          >
            {option}
          </div>
        ))}
      </div>
      <button onClick={handleGameStart}>Start</button>
    </div>
  );
}

export default GameSetup;
