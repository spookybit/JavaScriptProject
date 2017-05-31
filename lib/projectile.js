class Projectile {
  constructor(options) {
    this.pos = options.pos;
    this.sizex = 10;
    this.sizey = 30;
  }

  move() {
    this.pos[1] -= 10;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.rect(this.pos[0], this.pos[1], this.sizex, this.sizey);
    ctx.fill();
  }

}

module.exports = Projectile;
