function GameResult(props: any) {
  return (
    <>
      Game Result
      {`${props.result.numCorrect} / ${props.result.total}`}
      <button onClick={() => props.handleNewGame()}>Start</button>
    </>
  );
}

export default GameResult;
