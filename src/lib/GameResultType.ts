export class GameResultType {
  numCorrect: number;
  total: number;

  constructor(numCorrect: number, total: number) {
    this.numCorrect = numCorrect;
    this.total = total;
  }
}
