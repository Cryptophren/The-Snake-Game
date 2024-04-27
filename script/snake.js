import { gameBoard, onFoodTouched } from './game.js';

export class Snake {
  // snakePieces[0] is alwayes the head of the snake.
  #snakePieces = [];
  #speedIntervalId = null;
  #speedInterval = 160;

  get headX() {
    return this.#snakePieces[0].x;
  }

  get headY() {
    return this.#snakePieces[0].y;
  }

  addNewPiece() {
    const pieceEl = document.createElement('div');
    const pieceNum = this.#snakePieces.length;

    if (pieceNum === 0)
      pieceEl.classList.add('snake-head');
    else
      pieceEl.classList.add('snake-tale');

    const snakePiece = {
      element: pieceEl,
      num: pieceNum,
      // The initial position on the gameBoard.
      x: 1,
      y: 1,
      updatePositon: (stepX, stepY) => {
        if (snakePiece.num === 0) {
          snakePiece.x += stepX;
          snakePiece.y += stepY;
        } else {
          snakePiece.x = this.#snakePieces[snakePiece.num - 1].x;
          snakePiece.y = this.#snakePieces[snakePiece.num - 1].y;
        }
        pieceEl.style.setProperty('--x', snakePiece.x);
        pieceEl.style.setProperty('--y', snakePiece.y);
        pieceEl.style.display = 'flex';
      }
    }

    gameBoard.appendChild(pieceEl);
    this.#snakePieces.push(snakePiece);
  }

  handleArrowKeysInput() {
    window.addEventListener('keyup', (event) => {
      let stepX = 0, stepY = 0;

      switch (event.key) {
        case 'ArrowUp':
          stepY = -2;
          break;
        case 'ArrowDown':
          stepY = 2;
          break;
        case 'ArrowRight':
          stepX = 2;
          break;
        case 'ArrowLeft':
          stepX = -2;
      }

      this.moveSnake(stepX, stepY);
    });
  }

  moveSnake(stepX, stepY) {
    if (this.#speedIntervalId)
      clearInterval(this.#speedIntervalId);

    this.#speedIntervalId = setInterval(() => {
      for (let i = this.#snakePieces.length - 1; i >= 0; i--)
        this.#snakePieces[i].updatePositon(stepX, stepY);

      this.manageCurrentState();
    }, this.#speedInterval);
  }

  manageCurrentState() {

    onFoodTouched();

    // Reset the game if hit a wall.
    if (this.headX < 1 || this.headY < 1
      || this.headX > 41 || this.headY > 41) {
      this.resetGame();
      this.showMessage(100);
    }

    // Reset the game if hit self.
    for (let i = 1, ln = this.#snakePieces.length; i < ln; i++)
      if (this.headX === this.#snakePieces[i].x
        && this.headY === this.#snakePieces[i].y) {
        this.resetGame();
        this.showMessage(101);
        break;
      }
  }

  toggelSnakeSpeed() {
    this.#speedInterval -= 40;
    if (this.#speedInterval < 80)
      this.#speedInterval = 160;
    return this.#speedInterval;
  }

  showMessage(code) {
    let msg = '';

    // Message codes:
    // 100: hit the wall.
    // 101: hit self.

    switch (code) {
      case 100:
        msg = 'You hit the wall!';
        break;
      case 101:
        msg = 'You hit your self!';
    }

    alert(msg);
  }

  resetGame() {
    clearInterval(this.#speedIntervalId);

    this.#snakePieces[0].x = 1;
    this.#snakePieces[0].y = 1;
    this.#snakePieces[0].updatePositon(0, 0);

    for (let i = 1, ln = this.#snakePieces.length; i < ln; i++)
      gameBoard.removeChild(this.#snakePieces[i].element);

    // Keep only the head in the array
    this.#snakePieces.splice(1);
  }
}



