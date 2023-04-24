let hue = 0;
let hue2 = 0;
let MAX_BULLET_TIME = 60;
const availableKeys = ["ARROWRIGHT", "ARROWLEFT", "SPACE", "KEYA", "KEYD"];
const pressedButtons = new Set();

class Entity {
  constructor(size, position, canvas) {
    this.canvas = canvas;
    this.size = size;
    this.position = new vector2(position.x, position.y);
  }
}
class Player extends Entity {
  constructor(size, position, speed, canvas, makeBullet) {
    super(size, position, canvas);
    this.makeBullet = makeBullet;
    this.speed = speed;
    this.gunBuffer = MAX_BULLET_TIME;
  }
  handleInput() {
    pressedButtons.forEach((e) => {
      if ((e == "ARROWLEFT" || e == "KEYA") && this.position.x > 0) {
        this.position.x -= this.speed;
      } else if (
        (e == "ARROWRIGHT" || e == "KEYD") &&
        this.position.x < this.canvas.width - this.size.x
      ) {
        this.position.x += this.speed;
      } else if (e == "SPACE" && this.gunBuffer >= MAX_BULLET_TIME) {
        this.gunBuffer = 0;
        this.makeBullet();
      }
    });
  }
  input() {
    document.addEventListener("keydown", (event) => {
      if (availableKeys.includes(event.code.toUpperCase())) {
        pressedButtons.add(event.code.toUpperCase());
      }
    });
    document.addEventListener("keyup", (event) => {
      if (availableKeys.includes(event.code.toUpperCase())) {
        pressedButtons.delete(event.code.toUpperCase());
      }
    });
    this.handleInput();
  }
  update() {
    this.input();
    if (this.gunBuffer < MAX_BULLET_TIME) this.gunBuffer++;
  }
  render(ctx) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.shadowColor = "red";
    ctx.shadowBlur = 20;
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.restore();
  }
}
class Enemy extends Entity {
  constructor(size, position, speed, canvas, makeEnemyBullet) {
    super(size, position, canvas);
    this.speed = speed;
    this.maxXPos = position.x + size.x;
    this.minXPos = position.x - size.x;
    this.inc = Math.random() > 0.5 ? true : false;
    this.makeEnemyBullet = makeEnemyBullet;
    this.MaxTime = Math.ceil((Math.random() * 4 + 1) * 20);
    this.currentTime = 0;
  }
  dropBullet() {
    if (this.MaxTime <= this.currentTime) {
      this.makeEnemyBullet(this);
      this.currentTime = 0;
    } else {
      this.currentTime += 1.2;
    }
  }
  update() {
    if (this.inc && this.position.x < this.maxXPos) {
      this.position.x += this.speed;
    } else if (this.inc && this.position.x >= this.maxXPos) {
      this.inc = false;
    } else if (!this.inc && this.position.x > this.minXPos) {
      this.position.x -= this.speed;
    } else if (!this.inc && this.position.x <= this.minXPos) {
      this.inc = true;
    }
    this.dropBullet();
  }
  render(ctx) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.shadowColor = "white";
    ctx.shadowBlur = 5;
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.restore();
  }
}
class PlayerBullet extends Entity {
  constructor(size, position, canvas, speed) {
    super(size, position, canvas);
    this.speed = speed;
    this.isHueIncreasing = true;
    this.isDeprecated = false;
  }
  update() {
    if (this.position.y > -this.size.y) {
      this.position.y -= this.speed;
    } else {
      this.isDeprecated = true;
    }
  }
  render(ctx) {
    hueUpdate();
    ctx.save();
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.shadowColor = "hsl(" + hue + ", 100%, 50%)";
    ctx.shadowBlur = 20;
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.restore();
  }
}
class EnemyBullet extends Entity {
  constructor(size, position, canvas, speed) {
    super(size, position, canvas);
    this.speed = speed;
    this.isHueIncreasing = true;
    this.isDeprecated = false;
    this.color = "hsl(" + (hue2 +  Math.floor(Math.random() * 100)) + ", 100%, 50%)";
  }
  update() {
    if (this.position.y < this.canvas.height) {
      this.position.y += this.speed;
    } else {
      this.isDeprecated = true;
    }
  }
  render(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    // ctx.shadowColor = "hsl(" + hue2 + ", 100%, 50%)";
    // ctx.shadowBlur = 20;
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.restore();
  }
}
class PowerUp extends Entity {
  constructor(position, size, speed, canvas) {
    super(size, position, canvas);
    this.speed = speed;
    this.isDeprecated = false;
  }
  update() {
    if (this.position.y < this.canvas.height) {
      this.position.y += this.speed;
    } else {
      this.isDeprecated = true;
    }
  }
  render(ctx) {
    hue2Update();
    ctx.save();
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    ctx.shadowColor = "hsl(" + hue + ", 100%, 50%)";
    ctx.shadowBlur = 20;
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.restore();
  }
}
function hueUpdate() {
  hue += 0.5;
  if (hue > 360) hue = 0;
}
function hue2Update() {
  hue2 += 0.5;
  if (hue2 > 360) hue2 = 0;
}
