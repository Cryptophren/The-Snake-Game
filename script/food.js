import { gameBoard } from './game.js';

export class Food {
  #foodPiece = null;
  // The position coordinates of the foodPiece on the gameBoard.
  #x = 1;
  #y = 1;

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  #getRandomPosition() {
    this.#x = Math.ceil(Math.random() * 21) * 2 - 1;
    this.#y = Math.ceil(Math.random() * 21) * 2 - 1;
  }

  spawnNewPiece() {
    if (this.#foodPiece)
      gameBoard.removeChild(this.#foodPiece);

    this.#foodPiece = document.createElement('div');
    this.#foodPiece.classList.add('food');
    this.#getRandomPosition();
    this.#foodPiece.style.setProperty('--x', this.x);
    this.#foodPiece.style.setProperty('--y', this.y);
    gameBoard.appendChild(this.#foodPiece);
  }
}