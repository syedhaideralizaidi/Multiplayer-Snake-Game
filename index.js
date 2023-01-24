const BG_COLOUR = '#04AA6D';
const SNAKE_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66916';

const socket = io.connect("http://localhost:3000");
socket.on('init',handleInit);
socket.on('gameState',handleGameState);
socket.on('gameOver',handleGameOver);

const gameScreen=document.getElementById('gameScreen');

let canvas, ctx;
let playerNumber;
let gameActive = false;




function init() {
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  canvas.width = 600;
  canvas.height = 600;

  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  document.addEventListener('keydown', keydown);
  //gameActive = true;
}

function keydown(e){

  console.log(e.keyCode);
  socket.emit('keydown',e.keyCode);
}

init();

function paintGame(state) {
  ctx.fillStyle = BG_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const food = state.food;
  const gridsize = state.gridsize;
  const size = canvas.width / gridsize;

  ctx.fillStyle = FOOD_COLOUR;
  ctx.fillRect(food.x * size, food.y * size, size, size);

  paintPlayer(state.player, size, SNAKE_COLOUR);
  //paintPlayer(state.players[1], size, 'red');
}

function paintPlayer(playerState, size, colour) {
  const snake = playerState.snake;

  ctx.fillStyle = colour;
  for (let cell of snake) {
    ctx.fillRect(cell.x * size, cell.y * size, size, size);
  }
}

paintGame(gameState);

function handleInit(msg){
  console.log(msg);
}

function handleGameState(gameState) {
  // if (!gameActive) {
  //   return;
  // }
  gameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(gameState));
}

function handleGameOver() {
  alert("you loose");
}