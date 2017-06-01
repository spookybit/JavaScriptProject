class Target {
  constructor(pos) {
    this.pos = pos;
    this.sizex = 50;
    this.sizey = 50;

    this.pic = new Image();
    this.pic.src = "./lib/rupee.png";
  }

  draw(ctx) {
    ctx.drawImage(this.pic, this.pos[0], this.pos[1], this.sizex, this.sizey);
  }

  move () {

  }

}

module.exports = Target;
