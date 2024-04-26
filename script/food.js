import { gameBoard } from './game.js';

export class Food {
  #x = 0;
  #y = 0;
  #foodPiec;

  constructor() { }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get #randomPosition() {
    this.#x = Math.ceil(Math.random() * 21);
    this.#y = Math.ceil(Math.random() * 21);
    return `${this.#y}/${this.#x}`;
  }

  create() {
    this.#foodPiec = document.createElement('div');
    this.#foodPiec.classList.add('food');
    this.#foodPiec.style.gridArea = this.#randomPosition;
    gameBoard.appendChild(this.#foodPiec);
  }

  replace() {
    gameBoard.removeChild(this.#foodPiec);
    this.create();
  }
}