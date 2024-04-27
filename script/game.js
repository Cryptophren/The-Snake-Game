import { Food } from './food.js';
import { Snake } from './snake.js';

class SnakeGame {
  gameBoard;
  difficultyBtn;

  constructor() {
    this.gameBoard = document.querySelector('.game-board');
    this.difficultyBtn = document.querySelector('.difficulty-btn');
  }

  activateGameButtons() {
    this.difficultyBtn
      .addEventListener('click', this.handleDifficultyChange);
  }

  handleDifficultyChange = () => {
    const currInterval = snake.toggelSnakeSpeed();

    // The animation duration should alwayes be at least 20ms shorter than the speedInterval to avoid laggy animation.

    document.documentElement
      .style.setProperty('--duration', `${currInterval - 20}ms`);

    switch (currInterval) {
      case 160:
        this.difficultyBtn.textContent = 'Easy';
        this.difficultyBtn.style.setProperty('--bg-color', '#299a52');
        break;
      case 120:
        this.difficultyBtn.textContent = 'Medium';
        this.difficultyBtn.style.setProperty('--bg-color', '#ae9213');
        break;
      case 80:
        this.difficultyBtn.textContent = 'Hard';
        this.difficultyBtn.style.setProperty('--bg-color', '#ae1313');
    }
  }
}

const
  snakeGame = new SnakeGame(),
  food = new Food(),
  snake = new Snake();

export const gameBoard = snakeGame.gameBoard;

snakeGame.activateGameButtons();
food.spawnNewPiece();
snake.handleArrowKeysInput();
snake.addNewPiece();


export function onFoodTouched() {
  if (snake.headX === food.x && snake.headY === food.y) {
    food.spawnNewPiece();
    snake.addNewPiece();
  }
}