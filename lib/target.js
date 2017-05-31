class Target {
  constructor(pos) {
    this.pos = pos;
    this.sizex = 50;
    this.sizey = 50;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.rect(this.pos[0], this.pos[1], this.sizex, this.sizey);
    ctx.fill();
  }

  move () {

  }

}

module.exports = Target;
