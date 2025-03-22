import { useState } from 'react';

import { CharacterList } from '../lib/CharacterList';

import './GameSetup.css';

function GameSetup(props: any) {
  const questionCounts = [5, 50, 100, 200];

  const [questionCountIndex, setQuestionCountIndex] = useState(-1);

  const selectQuestionCount = (index: number) => {
    setQuestionCountIndex(index);
  };

  const pickHanzi = (count: number) => {
    const characters = structuredClone(CharacterList);
    // for (let i = characters.length - 4000; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [characters[i], characters[j]] = [characters[j], characters[i]];
    // }

    return characters.slice(0, count);
  };

  const handleGameStart = () => {
    if (questionCountIndex >= 0) {
      props.handleGameStart(pickHanzi(questionCounts[questionCountIndex]));
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
