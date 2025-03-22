function GameResult(props: any) {
  return (
    <>
      Game Result
      <button onClick={() => props.handleNewGame()}>Start</button>
    </>
  );
}

export default GameResult;
