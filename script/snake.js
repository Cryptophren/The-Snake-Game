import { gameBoard, checkFood } from './game.js';

export class Snake {
  #snakePieces = [];
  #gameIntervalId = null;
  #speed = 150;

  get headX() {
    return this.#snakePieces[0].x;
  }

  get headY() {
    return this.#snakePieces[0].y;
  }

  addSnakePiec() {
    const piecEl = document.createElement('div');
    const piecNum = this.#snakePieces.length;

    if (piecNum === 0)
      piecEl.classList.add('snake-head');
    else
      piecEl.classList.add('snake-tale');

    const piec = {
      element: piecEl,
      x: 3,
      y: 11,
      updatePositon: (a, b) => {
        if (piecNum === 0) {
          piec.x += a;
          piec.y += b;
        } else {
          piec.x = this.#snakePieces[piecNum - 1].x;
          piec.y = this.#snakePieces[piecNum - 1].y;
          piecEl.style.display = 'block';
        }
        piecEl.style.gridArea = `${piec.y}/${piec.x}`;
      }
    }

    gameBoard.appendChild(piecEl);
    this.#snakePieces.push(piec);
    this.#snakePieces[0].updatePositon(0, 0);
  }

  moveSnake(direction) {
    let x = 0, y = 0;

    switch (direction) {
      case 'ArrowUp':
        y = -1;
        break;
      case 'ArrowDown':
        y = 1;
        break;
      case 'ArrowRight':
        x = 1;
        break;
      case 'ArrowLeft':
        x = -1;
    }

    if (this.#gameIntervalId)
      clearInterval(this.#gameIntervalId);

    this.#gameIntervalId = setInterval(() => {
      for (let i = this.#snakePieces.length - 1; i >= 0; i--) {
        this.#snakePieces[i].updatePositon(x, y);
      }
      this.checkState();
    }, this.#speed);
  }

  checkState() {
    checkFood();

    if (this.headX < 1 || this.headY < 1
      || this.headX > 21 || this.headY > 21)
      this.resetGame();

    for (let i = 1, ln = this.#snakePieces.length; i < ln; i++)
      if (this.headX === this.#snakePieces[i].x
        && this.headY === this.#snakePieces[i].y) {
        this.resetGame();
        break;
      }
  }

  resetGame() {
    clearInterval(this.#gameIntervalId);

    this.#snakePieces[0].x = 3;
    this.#snakePieces[0].y = 11;
    this.#snakePieces[0].updatePositon(0, 0);

    for (let i = 1, ln = this.#snakePieces.length; i < ln; i++)
      gameBoard.removeChild(this.#snakePieces[i].element);

    this.#snakePieces.splice(1);

    alert('You hit the wall!');
  }

  toggleSpeed() {
    this.#speed -= 40;
    if (this.#speed < 70)
      this.#speed = 150;

    console.log(this.#speed);
  }
}



