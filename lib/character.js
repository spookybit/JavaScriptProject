// need to pass options and draw(ctx)

class Character {
  constructor(options) {
    this.pos = options.pos;
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.rect(this.pos[0], this.pos[1], 50, 50);
    ctx.fill();
  }



}

module.exports = Character;
