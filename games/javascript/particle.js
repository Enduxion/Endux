const MIN_SCALE = 0.2;
const PARTICLE_TYPES = {
  CIRCLE: 0,
  SQR: 1,
};
class Particle {
  constructor(
    position,
    maxSize,
    reference,
    tremble,
    maxSpeed,
    type,
    name,
    color
  ) {
    if (reference) {
      this.position = position;
    } else {
      this.position = new vector2(position.x, position.y);
    }
    this.maxSize = maxSize;
    this.tremble = tremble;
    this.maxSpeed = maxSpeed;
    this.type = type;
    this.name = name;
    this.color = color;
    this.isDeprecated = false;
  }
}

// Explosiion Particles

class ExplosionParticle extends Particle {
  constructor(
    position,
    maxSize,
    reference,
    tremble,
    maxSpeed,
    type,
    name,
    color
  ) {
    super(position, maxSize, reference, tremble, maxSpeed, type, name, color);
    this.speedX = Math.random() * maxSpeed - 0.5 * maxSpeed;
    this.speedY = Math.random() * maxSpeed - 0.5 * maxSpeed;
    this.scale = Math.random() * maxSize + 1;
  }
  update() {
    if (this.scale <= MIN_SCALE && !this.isDeprecated) {
      this.isDeprecated = true;
    } else if (this.scale > MIN_SCALE && !this.isDeprecated) {
      this.scale -= 0.1;
      this.position.x += this.speedX;
      this.position.y += this.speedY;
      if (this.tremble) {
        this.position.x += Math.random() * 3 - 1.5;
        this.position.y += Math.random() * 3 - 1.5;
      }
    }
  }
  render(ctx, glow, color1, differentColor) {
    ctx.save();
    if (differentColor) {
      ctx.fillStyle = color1;
    } else {
      ctx.fillStyle = this.color;
    }
    if (glow) {
      if (differentColor) {
        ctx.shadowColor = color1;
      } else {
        ctx.shadowColor = this.color;
      }
      ctx.shadowBlur = 20;
    }
    if (this.type == PARTICLE_TYPES.SQR) {
      ctx.fillRect(this.position.x, this.position.y, this.scale, this.scale);
    } else {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.scale, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }
}

// Gravity Particles

class GravityParticle extends Particle {
  constructor(
    position,
    maxSize,
    reference,
    tremble,
    maxSpeed,
    type,
    name,
    color
  ) {
    super(position, maxSize, reference, tremble, maxSpeed, type, name, color);
    this.speedX = 0;
    this.speedY = 0.5 * maxSpeed;
    this.scale = Math.random() * maxSize + 1;
  }
  update() {
    if (this.scale <= MIN_SCALE && !this.isDeprecated) {
      this.isDeprecated = true;
    } else if (this.scale > MIN_SCALE && !this.isDeprecated) {
      this.scale -= 0.1;
      this.position.x += this.speedX;
      this.position.y += this.speedY;
      if (this.tremble) {
        this.position.x += Math.random() * 3 - 1.5;
        this.position.y += Math.random() * 3 - 1.5;
      }
    }
  }
  render(ctx, glow, color1, differentColor) {
    ctx.save();
    if (differentColor) {
      ctx.fillStyle = color1;
    } else {
      ctx.fillStyle = this.color;
    }
    if (glow) {
      if (differentColor) {
        ctx.shadowColor = color1;
      } else {
        ctx.shadowColor = this.color;
      }
      ctx.shadowBlur = 20;
    }
    if (this.type == PARTICLE_TYPES.SQR) {
      ctx.fillRect(this.position.x, this.position.y, this.scale, this.scale);
    } else {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.scale, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }
}
