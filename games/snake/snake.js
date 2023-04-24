const canvas = document.getElementById("mainCanvas");
const context = canvas.getContext("2d");
canvas.style.display = "none";
let isPaused = false;
let gameOver = false;
let hue = 90;
let hueStart = 90;
let hueUpdateBy = 0.5;
let snakeLength = 0;
let weird = false;
const particleData = [];
// Variables and contructors
function vector2(x, y) {
  this.x = x;
  this.y = y;
}
class sqrBox {
  constructor(position, name) {
    this.index = snakeLength;
    this.name = name;
    this.position = position;
    this.size = new vector2(14, 14);
  }
  render(ctx) {
    ctx.save();
    if (this.name == "snakeHead" || this.name == "snakeBody") {
      ctx.fillStyle = "hsl(" + (hue + this.index) + ", 100%, 50%)";
      ctx.shadowColor = "hsl(" + (hue + this.index) + ", 100%, 50%)";
    } else if (this.name == "fruit") {
      ctx.fillStyle = "red";
      ctx.shadowColor = "red";
    }
    ctx.shadowBlur = 20;
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.restore();
  }
}
class Particle {
  constructor() {
    this.position = new vector2(fruit.position.x, fruit.position.y);
    this.scale = 1 + Math.random() * 10;
    this.speedVector = new vector2(
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    );
  }
  update() {
    if (this.scale >= 0.5) this.scale -= 0.5;
    this.position.x += this.speedVector.x;
    this.position.y += this.speedVector.y;
  }
  render(ctx) {
    ctx.save();
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.shadowColor = "hsl(" + hue + ", 100%, 50%)";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
// Real variables
const snakeHead = new sqrBox(new vector2(0, 0), "snakeHead");
const snakeBody = [];
const fruit = new sqrBox(new vector2(0, 0), "fruit");
let score = 0;
const possibleButton = [
  "ARROWLEFT",
  "ARROWRIGHT",
  "ARROWUP",
  "ARROWDOWN",
  "W",
  "S",
  "A",
  "D",
];
const Direction = {
  STOP: -1,
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
let currentDirection = Direction.STOP;
let pressedButtons = new Set();
var speed;
// const
// Functions
function setCanvas(width, height) {
  canvas.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  canvas.width = width;
  canvas.height = height;
}
function spawnFruit() {
  fruit.position.x =
    Math.floor((Math.random() * (canvas.width - fruit.size.x)) / fruit.size.x) *
    fruit.size.x;
  fruit.position.y =
    Math.floor(
      (Math.random() * (canvas.height - fruit.size.y)) / fruit.size.y
    ) * fruit.size.y;
}
function checkIfFruitSpawnedInPlayer() {
  if (
    fruit.position.x < 0 ||
    fruit.position.x > canvas.width - fruit.size.x ||
    fruit.position.y < 0 ||
    fruit.position.y > canvas.height - fruit.size.y
  ) {
    spawnFruit();
  }
  if (intersectRect(fruit, snakeHead)) {
    checkIfFruitSpawnedInPlayer();
  }
  snakeBody.forEach((e) => {
    if (intersectRect(e, fruit)) {
      spawnFruit();
      checkIfFruitSpawnedInPlayer();
    }
  });
}
function init() {
  snakeBody.splice(0, snakeBody.length);
  particleData.splice(0, particleData.length);
  score = 0;
  snakeLength = 0;
  currentDirection = Direction.STOP;
  snakeHead.position.x = canvas.width / 2;
  snakeHead.position.y = canvas.height / 2;
  spawnFruit();
  checkIfFruitSpawnedInPlayer();
  speed = 14;
  hueStart = 90;
  hue = hueStart;
  gameOver = false;
  if (weird) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    hueUpdateBy = Math.random() * 180;
    hueStart = Math.random() * 360;
    hue = hueStart;
  }
}
// UpdateFunction
let isKeyDown = false;
function takeInput() {
  // When a key is pressed we add it to pressedButton
  document.addEventListener("keydown", (event) => {
    possibleButton.forEach((e) => {
      if (e == event.key.toUpperCase() && !isKeyDown) {
        pressedButtons.add(e);
        isKeyDown = true;
        setTimeout(() => {
          isKeyDown = false;
        }, 30);
      }
    });
  });
  // When a key is de-pressed we remove it from pressedButton
  document.addEventListener("keyup", (event) => {
    pressedButtons.forEach((e) => {
      if (e == event.key.toUpperCase()) {
        pressedButtons.delete(e);
      }
    });
  });
}
function dealInput() {
  pressedButtons.forEach((e) => {
    if ((e == "ARROWUP" || e == "W") && currentDirection != Direction.DOWN) {
      currentDirection = Direction.UP;
    } else if (
      (e == "ARROWDOWN" || e == "S") &&
      currentDirection != Direction.UP
    ) {
      currentDirection = Direction.DOWN;
    } else if (
      (e == "ARROWLEFT" || e == "A") &&
      currentDirection != Direction.RIGHT
    ) {
      currentDirection = Direction.LEFT;
    } else if (
      (e == "ARROWRIGHT" || e == "D") &&
      currentDirection != Direction.LEFT
    ) {
      currentDirection = Direction.RIGHT;
    }
  });
  if (currentDirection == Direction.UP) {
    snakeHead.position.y -= speed;
  } else if (currentDirection == Direction.DOWN) {
    snakeHead.position.y += speed;
  } else if (currentDirection == Direction.LEFT) {
    snakeHead.position.x -= speed;
  } else if (currentDirection == Direction.RIGHT) {
    snakeHead.position.x += speed;
  }
}
let boxMargin = 2;
function intersectRect(box1, box2) {
  return !(
    box2.position.x > box1.position.x + box1.size.x - boxMargin ||
    box2.position.x + box2.size.x - boxMargin < box1.position.x ||
    box2.position.y > box1.position.y + box1.size.y - boxMargin ||
    box2.position.y + box2.size.y - boxMargin < box1.position.y
  );
}
function fruitEaten() {
  if (intersectRect(fruit, snakeHead)) {
    startAnimation();
    spawnFruit();
    checkIfFruitSpawnedInPlayer();
    if (!weird) {
      snakeLength++;
      snakeBody.push(new sqrBox(new vector2(-20, -20), "snakeBody"));
    }
    score++;
  }
}
function directionVector() {
  if (currentDirection == Direction.LEFT || currentDirection == Direction.UP)
    return 1;
  else if (currentDirection != Direction.STOP) return -1;
  return 0;
}
function updateTail() {
  let px = snakeHead.position.x;
  let py = snakeHead.position.y;
  var px1, py1;
  snakeBody.forEach((e) => {
    px1 = e.position.x;
    py1 = e.position.y;
    e.position.x = px;
    e.position.y = py;
    px = px1;
    py = py1;
  });
}
function checkCollision() {
  if (
    snakeHead.position.x < 0 ||
    snakeHead.position.x + snakeHead.size.x > canvas.width ||
    snakeHead.position.y < 0 ||
    snakeHead.position.y + snakeHead.size.y > canvas.height
  ) {
    gameOver = true;
  }
  for (let i = 2; i < snakeBody.length; i++) {
    if (intersectRect(snakeBody[i], snakeHead)) {
      gameOver = true;
    }
  }
}
function update() {
  hue += hueUpdateBy;
  if (hue >= hueStart + 360) hue = hueStart;
  if (!weird) updateTail();
  takeInput();
  dealInput();
  fruitEaten();
  checkCollision();
}
function drawBodyArray(ctx) {
  snakeBody.forEach((e) => {
    e.render(ctx);
  });
}
function scoreRender(ctx) {
  let stringScore = "Score: " + score;
  ctx.font = "30px KoHo";
  ctx.fillStyle = "white";
  ctx.fillText(stringScore, canvas.width - 140, 33);
}
function startAnimation() {
  for (let i = 0; i < 25; i++) {
    particleData.push(new Particle());
  }
}
function renderAnimation(context) {
  for (let i = 0; i < particleData.length; i++) {
    particleData[i].update();
    particleData[i].render(context);
    if (particleData[i].scale <= 0.5) {
      particleData.splice(i, 1);
      i--;
    }
  }
}
function animate() {
  update();
  if (!weird) {
    context.fillStyle = "rgba(0, 0, 0, 0.3)";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  snakeHead.render(context);
  fruit.render(context);
  renderAnimation(context);
  scoreRender(context);
  drawBodyArray(context);
  if (!isPaused && !gameOver) {
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 30);
  }
  if (gameOver) {
    promptMenu(true);
  }
}
function resetGame() {
  init();
}
