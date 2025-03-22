import { useState } from 'react';

import '../lib/PinyinFinder';
import { finder } from '../lib/PinyinFinder';

import './Game.css';

function Game(props: any) {
  const [index, setIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [options, setOptions] = useState([]);

  const handleInputChange = (event: any) => {
    setInputVal(event.target.value);
    setOptions(finder(event.target.value));
  };

  const handleGuess = () => {
    if (index < props.list.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <>
      <div>{props.list[index]['character']}</div>
      <div>
        <div className='input'>
          <input className='input__field' onChange={handleInputChange} value={inputVal}></input>
          {options && options.length > 0 ? options.map((option, index) => <div>{option}</div>) : <div></div>}
        </div>
        <div className='input__button' onClick={handleGuess}>
          确认
        </div>
      </div>
    </>
  );
}

export default Game;
