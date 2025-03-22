import { useState } from 'react';

import { GameResultType } from '../lib/GameResultType';
import { finder } from '../lib/PinyinFinder';

import './Game.css';

function Game(props: any) {
  const [index, setIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [numCorrect, setNumCorrect] = useState(0);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (options.length > 0) {
        if (selectedOption == options.length - 1) {
          setSelectedOption(0);
        } else {
          setSelectedOption(selectedOption + 1);
        }
      }
    } else if (event.key === 'Backspace') {
      setSelectedOption(-1);
      return;
    } else if (event.key === 'Enter') {
      // Make sure an option is selected as answer
      if (selectedOption == -1) {
        return;
      }

      // Validate answer
      const isCorrect = props.characters[index]['readings'].includes(options[selectedOption]);
      if (isCorrect) {
        setNumCorrect(numCorrect + 1);
      }

      // Reset input, selected option, and options
      setInputVal('');
      setSelectedOption(-1);
      setOptions([]);

      // Update index or handle game end
      if (index < props.characters.length - 1) {
        setIndex(index + 1);
      } else {
        props.handleGameEnd(new GameResultType(numCorrect, props.characters.length));
      }
      return;
    } else if (!/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
    } else {
      setSelectedOption(-1);
    }
  };

  const handleInputChange = (event: any) => {
    setInputVal(event.target.value);
    setOptions(finder(event.target.value));
  };

  return (
    <>
      <div>
        Score: {numCorrect} / {index}
      </div>
      <div>{props.characters[index]['character']}</div>
      <div className='game'>
        <div className='input'>
          <input
            className='input__field'
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            value={inputVal}
          ></input>
          {options && options.length > 0 ? (
            <div className='input__option-container'>
              {options.map((option, index) => (
                <div className={`input__option ${index == selectedOption ? 'input__option-selected' : ''}`} key={index}>
                  {option}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Game;
