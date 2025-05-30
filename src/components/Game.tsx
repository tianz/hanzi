import { useEffect, useRef, useState } from 'react';

import { HistoryEntry } from '../lib/HistoryEntry';
import { finder } from '../lib/PinyinFinder';

import './Game.css';

function Game(props: any) {
  const [index, setIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [numCorrect, setNumCorrect] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameEnded) {
      props.handleGameEnd(history);
    } else {
      inputRef.current?.focus();
    }
  }, [numCorrect, gameEnded]);

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
    } else if (event.key === 'Enter') {
      // Make sure an option is selected as answer
      if (selectedOption == -1) {
        return;
      }
      submit(options[selectedOption]);
    } else if (!/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
    } else {
      // Valid input, reset selected option
      setSelectedOption(-1);
    }
  };

  const submit = (guess: string) => {
    // Save to history
    setHistory([...history, new HistoryEntry(props.characters[index], guess)]);

    // Validate answer
    const isCorrect = props.characters[index]['readings'].includes(guess);
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
      setGameEnded(true);
    }
  };

  const handleInputChange = (event: any) => {
    setInputVal(event.target.value);
    setOptions(finder(event.target.value));
  };

  const handleOptionClick = (index: number) => {
    submit(options[index]);
  };

  return (
    <>
      <div>
        Score: {numCorrect} / {index}
      </div>
      <div className='game'>
        <div className='character'>{props.characters[index]['character']}</div>
        <div className='input'>
          <input
            className='input__field'
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            value={inputVal}
            spellCheck='false'
            autoComplete='off'
            autoCorrect='off'
          ></input>
          {options && options.length > 0 ? (
            <div className='input__option-container'>
              {options.map((option, index) => (
                <div
                  className={`input__option ${index == selectedOption ? 'input__option--selected' : ''}`}
                  key={index}
                  onClick={() => handleOptionClick(index)}
                >
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
