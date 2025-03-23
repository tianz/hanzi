import { Character } from './CharacterList';

export class HistoryEntry {
  character: Character;
  guess: string;
  isCorrect: boolean;

  constructor(character: Character, guess: string) {
    this.character = character;
    this.guess = guess;
    this.isCorrect = character.readings.includes(guess);
  }
}
