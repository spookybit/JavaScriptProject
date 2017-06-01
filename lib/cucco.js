class Cucco {
  constructor(options) {
    this.pos = [700,100];
    this.sizex = 50;
    this.sizey = 50;
    this.pic = new Image();
    this.pic.src = "./images/cucco.png";
  }

  move() {
    this.pos[0] -= 5;
  }

  draw(ctx) {
    ctx.drawImage(this.pic, this.pos[0], this.pos[1], this.sizex, this.sizey);
  }


}

module.exports = Cucco;
