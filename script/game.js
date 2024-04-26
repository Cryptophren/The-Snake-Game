import { Food } from './food.js';
import { Snake } from './snake.js';

export const gameBoard =
  document.querySelector('.game-board');

const food = new Food();
let snake = new Snake();

food.create();

snake.addSnakePiec();

window.addEventListener('keyup', (event) => {
  snake.moveSnake(event.key);
});

export function checkFood() {
  if (snake.headX === food.x && snake.headY === food.y) {
    food.replace();
    snake.addSnakePiec();
  }
}

// const playBtn = document.querySelector('.play-btn');
// playBtn.addEventListener('click', () => {
//   snake.toggleSpeed();
// });


// const startBtn = document.querySelector('.start-btn');
// startBtn.addEventListener('click', () => {
//   document.querySelector('.snake-head')
//     .classList.toggle('move');
// });

