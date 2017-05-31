// need to pass options and draw(ctx)

class Character {
  constructor(options) {
    this.pos = options.pos;
    this.sizex = 50;
    this.sizey = 50;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(this.pos[0], this.pos[1], this.sizex, this.sizey);
    ctx.fill();
  }

  move() {

  }

}

module.exports = Character;
