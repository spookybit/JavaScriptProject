// need to pass options and draw(ctx)

class Character {
  constructor(options) {
    this.pos = options.pos;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(this.pos[0], this.pos[1], 50, 50);
    ctx.fill();
  }

  move() {

  }

}

module.exports = Character;
