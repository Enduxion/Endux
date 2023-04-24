const availableKeys = ["ARROWDOWN", "ARROWUP", "KEYW", "KEYS"];
const friction = 0.02;
class Entity {
  constructor(size, position, canvas, name) {
    this.size = size;
    this.position = position;
    this.canvas = canvas;
    this.name = name;
  }
}
// KeyType 0 -> WASD  1 -> UDLR
class Player extends Entity {
  constructor(size, position, canvas, name, maxSpeed, acceleration, keyType) {
    super(size, position, canvas, name);
    this.maxSpeed = maxSpeed;
    this.currentSpeed = 0;
    this.acceleration = acceleration;
    this.pressedButtons = new Set();
    this.keyType = keyType;
    this.bounceForce = 0;
  }
  goUp() {
    if (-this.maxSpeed <= this.currentSpeed) 
      this.currentSpeed -= this.acceleration;
  }
  goDown() {
    if (this.maxSpeed >= this.currentSpeed) 
      this.currentSpeed += this.acceleration;
  }
  handleInput() {
    this.pressedButtons.forEach((e) => {
      if (this.keyType == 0) {
        if (e == "KEYW" && this.position.y > 0) {
          this.goUp();
        } else if (e == "KEYS" && this.position.y < this.canvas.height - this.size.y) {
          this.goDown();
        }
      } else {
        if (e == "ARROWUP" && this.position.y > 0) {
          this.goUp();
        } else if (e == "ARROWDOWN" && this.position.y < this.canvas.height - this.size.y) {
          this.goDown();
        }
      }
    });
    if (this.currentSpeed < 0) {
      this.currentSpeed += friction;
    } else {
      this.currentSpeed -= friction;
    }
    if (this.position.y < 0 || this.position.y > (this.canvas.height - this.size.y)) {
      if (this.currentSpeed > 0) {
        this.currentSpeed = this.bounceForce;
      } else {
        this.currentSpeed = this.bounceForce;
      }
    }
    this.bounceForce = -this.currentSpeed;
    this.position.y += this.currentSpeed;
  }
  input() {
    document.addEventListener("keydown", (event) => {
      if (availableKeys.includes(event.code.toUpperCase())) {
        this.pressedButtons.add(event.code.toUpperCase());
      }
    });
    document.addEventListener("keyup", (event) => {
      if (availableKeys.includes(event.code.toUpperCase())) {
        this.pressedButtons.delete(event.code.toUpperCase());
      }
    });
    this.handleInput();
  }
  update() {
    this.input();
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
// Ball class

class Ball extends Entity {
  constructor(size, position, canvas, name, velocity) {
    super(size, position, canvas, name);
    this.VEL_INI = new vector2(velocity.x, velocity.y);
    this.velocity = new vector2(velocity.x, velocity.y);
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  render(ctx) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.shadowColor = "white";
    ctx.shadowBlur = 20;
    ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    ctx.restore();
  }
}