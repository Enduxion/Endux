const canvas = document.getElementById("mainCanvas");
const context = canvas.getContext("2d");
canvas.style.display = "none";
let isPaused = false;
let gameOver = false;
let score = 0;
// Variables
const positionForEnemies = [
  new vector2(0, 0),
  new vector2(210, 0),
  new vector2(420, 0),
  new vector2(630, 0),
  new vector2(840, 0),
  new vector2(70, 28),
  new vector2(280, 28),
  new vector2(490, 28),
  new vector2(700, 28),
  new vector2(910, 28),
];
let isEnemyAlive;
let WAIT_TIME = 0,
  elapsedTime = 0;
const generalSize = new vector2(70, 14);
const bulletSize = new vector2(7, 35);
const playerBullets = [];
const particles = [];
const enemyBullets = [];
const enemies = [];
const powerUps = [];
const MAX_ENEMIES = 10;
let currentEnemyCount = 0;
var player;

// Functions
function setCanvas(width, height) {
  canvas.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  canvas.width = width;
  canvas.height = height;
}
function init() {
  score = 0;
  MAX_BULLET_TIME = 60;
  currentEnemyCount = 0;
  WAIT_TIME = Math.random() * 600 + 100;
  elapsedTime = 0;
  player = null;
  particles.splice(0, particles.length);
  enemies.splice(0, enemies.length);
  powerUps.splice(0, powerUps.length);
  playerBullets.splice(0, playerBullets.length);
  enemyBullets.splice(0, enemyBullets.length);
  player = new Player(
    generalSize,
    new vector2(
      canvas.width / 2 - generalSize.x / 2,
      canvas.height - generalSize.y
    ),
    5,
    canvas,
    makeBullet
  );
  isEnemyAlive = new Array(10).fill(false);
  spawnEnemy();
  gameOver = false;
}
function spawnEnemy() {
  makeEnemy(300);
}

function makeEnemy(timeS) {
  if (currentEnemyCount < MAX_ENEMIES) {
    for (let i = 0; i < isEnemyAlive.length; i++) {
      if (!isEnemyAlive[i]) {
        isEnemyAlive[i] = true;
        setTimeout(() => {
          enemies.splice(
            i,
            0,
            new Enemy(
              generalSize,
              positionForEnemies[i],
              5,
              canvas,
              makeEnemyBullet
            )
          );
        }, currentEnemyCount * timeS);
        currentEnemyCount++;
      }
    }
  }
}

function makeBullet() {
  playerBullets.push(
    new PlayerBullet(
      bulletSize,
      new vector2(
        player.position.x + player.size.x / 2,
        player.position.y - 2 * player.size.y
      ),
      canvas,
      40
    )
  );
}
function makeEnemyBullet(entity) {
  enemyBullets.push(
    new EnemyBullet(
      bulletSize,
      new vector2(
        entity.position.x + entity.size.x / 2,
        entity.position.y - 2 * entity.size.y
      ),
      canvas,
      10
    )
  );
}
function updateBullet() {
  for (let i = 0; i < playerBullets.length; i++) {
    playerBullets[i].update();
    if (playerBullets[i].isDeprecated) {
      playerBullets.splice(i, 1);
      i--;
    }
  }
}
function updatePowerUp() {
  for (let i = 0; i < powerUps.length; i++) {
    powerUps[i].update();
    if (powerUps[i].isDeprecated) {
      powerUps.splice(i, 1);
      i--;
    }
  }
}
function updateEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
  }
  for (let i = 0; i < enemyBullets.length; i++) {
    enemyBullets[i].update();
    if (enemyBullets[i].isDeprecated) {
      enemyBullets.splice(i, 1);
      i--;
    }
  }
}
function checkForCollision() {
  for (let i = 0; i < enemyBullets.length; i++) {
    if (intersection(enemyBullets[i], player)) {
      gameOver = true;
    }
    for (let j = 0; j < playerBullets.length; j++) {
      if (intersection(enemyBullets[i], playerBullets[j])) {
        makeParticleEffects(
          new vector2(playerBullets[j].position.x, playerBullets[j].position.y),
          "bullets"
        );
        enemyBullets.splice(i, 1);
        playerBullets.splice(j, 1);
        i--;
        break;
      }
    }
  }
  for (let i = 0; i < enemies.length; i++) {
    for (let j = 0; j < playerBullets.length; j++) {
      if (intersection(enemies[i], playerBullets[j])) {
        makeParticleEffects(
          new vector2(playerBullets[j].position.x, playerBullets[j].position.y),
          "bulletEnemy"
        );
        enemies.splice(i, 1);
        playerBullets.splice(j, 1);
        isEnemyAlive[i] = false;
        currentEnemyCount--;
        i--;
        score++;
        break;
      }
    }
  }
  for (let i = 0; i < powerUps.length; i++) {
    if (intersection(powerUps[i], player)) {
      MAX_BULLET_TIME = 5;
      setTimeout(() => {
        MAX_BULLET_TIME = 60;
      }, 5000);
    }
  }
}
function spawnPowerUp() {
  if (elapsedTime >= WAIT_TIME) {
    elapsedTime = 0;
    powerupPosition = new vector2(Math.random() * canvas.width - 14, 0);
    powerUps.push(new PowerUp(powerupPosition, new vector2(14, 14), 5, canvas));
  } else {
    elapsedTime++;
  }
}
function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    if (particles[i].isDeprecated) {
      particles.splice(i, 1);
      i--;
    }
  }
}
function renderParticles() {
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].name == "bulletEnemy") {
      particles[i].render(context, true, "lime", false);
    } else {
      particles[i].render(context, true, "hsl(" + hue2 + ", 100%, 50%)", true);
    }
  }
}
function update() {
  player.update();
  updateBullet();
  updateEnemies();
  updatePowerUp();
  checkForCollision();
  spawnPowerUp();
  makeEnemy(50);
  updateParticles();
}
function makeParticleEffects(position, collision) {
  if (collision == "bulletEnemy") {
    for (let i = 0; i < 50; i++) {
      particles.push(
        new ExplosionParticle(
          position,
          10,
          false,
          true,
          5,
          PARTICLE_TYPES.CIRCLE,
          "bulletEnemy",
          "red"
        )
      );
    }
  } else if (collision == "bullets") {
    for (let i = 0; i < 50; i++) {
      particles.push(
        new ExplosionParticle(
          position,
          5,
          false,
          false,
          8,
          PARTICLE_TYPES.SQR,
          "bullets",
          "nothing"
        )
      );
    }
  }
}
function animate() {
  update();
  context.fillStyle = "rgba(0, 0, 0, 0.4)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.render(context);
  playerBullets.forEach((bullet) => {
    bullet.render(context);
  });
  enemies.forEach((enemy) => {
    enemy.render(context);
  });
  enemyBullets.forEach((bullets) => {
    bullets.render(context);
  });
  powerUps.forEach((powerup) => {
    powerup.render(context);
  });
  renderParticles();
  scoreRender(context);
  if (!gameOver && !isPaused) {
    requestAnimationFrame(animate);
  }
  if (gameOver) {
    promptMenu();
  }
}
