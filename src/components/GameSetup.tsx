function GameSetup(props: any) {
    const questionCounts = [50, 100, 200];

    return (<>
        <div>新游戏</div>
        <div className="setup">
           <div>题目数量</div>
           <div className='game-setup-input__option-container'>
              {questionCounts.map((option, index) => <div className="input__option" key={index}>{option}</div>)}
          </div>
        </div>
        <button onClick={props.onStart}>Start</button>
      </>)
}

export default GameSetup;
