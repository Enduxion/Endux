const canvas = document.getElementById("mainCanvas");
const context = canvas.getContext("2d");
canvas.style.display = "none";
let isPaused = false;
let gameOver = false;
let score = 0;
let weird = false;
// Variables
var player1, player2;
var ball;

// Functions
function setCanvas(width, height) {
  canvas.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  canvas.width = width;
  canvas.height = height;
}
function init() {
  score = 0;
  playerSize = new vector2(14, 56);
  player1 = new Player(playerSize, new vector2(0, (canvas.height / 2) + 14), canvas, "player1", 20, 0.2, 0);
  if (weird) {
    player2 = new Player(playerSize, new vector2(canvas.width - playerSize.x, (canvas.height / 2) + 14), canvas, "player2", 20, 0.2, 1);
  }
  ball = new Ball(new vector2(14, 14), new vector2((canvas.width - 14)/2, (canvas.height - 14)/2), canvas, "ball1", new vector2(-8, 0));
  gameOver = false;
}
function collision(plr, bl) {
  let subVelX = 0;
  if (intersection(plr, bl)) {
    let check = false;
    subVelX = (plr.position.y + (plr.size.y / 2)) - (bl.position.y + (bl.size.y/2));
    if (bl.velocity.x > 0) check = true;
    bl.velocity.x *= -1;
    if ((bl.velocity.x > 0 && subVelX > 0) || (bl.velocity.x < 0 && subVelX < 0)) {
      bl.velocity.x -= (subVelX / 20);
    } else if ((bl.velocity.x > 0 && subVelX < 0) || (bl.velocity.x < 0 && subVelX > 0)) {
      bl.velocity.x += (subVelX / 20);
    }
    if ((check && bl.velocity.x > 0 || (!check && bl.velocity.x < 0))) bl.velocity.x *= -1;
    bl.velocity.y = Math.sqrt(Math.pow(bl.VEL_INI.x, 2) - Math.pow(bl.velocity.x, 2));
    if (subVelX > 0) {
      bl.velocity.y *= -1;
    }
    if (!weird) score++;
  }
}
function wallCollision(bl) {
  if (bl.position.y <= 0 || (bl.position.y + bl.size.y) >= canvas.height) {
    bl.velocity.y *= -1;
  }
  if (weird) {
    if (bl.position.x <= 0) {
      score = "Player 2 Won! (RIGHT)";
      gameOver = true;
    } else if (bl.position.x >= (canvas.width - bl.size.x)) {
      score = "Player 1 Won! (LEFT)";
      gameOver = true;
    }
  } else {
    if (bl.position.x <= 0) {
      gameOver = true;
    } else if (bl.position.x >= (canvas.width - bl.size.x)) {
      bl.velocity.x *= -1;
      
    }
  }
}
function update() {
  player1.update();
  if (weird) {
    player2.update();
  }
  ball.update();
  collision(player1, ball);
  if (weird) {
    collision(player2, ball);
  }
  wallCollision(ball);
}
function animate() {
  update();
  // render
  // context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(0, 0, 0, 0.4)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  player1.render(context);
  if (weird) {
    player2.render(context);
  }
  ball.render(context);
  if (!gameOver && !isPaused) {
    requestAnimationFrame(animate);
  }
  if (gameOver) {
    promptMenu();
  }
}
