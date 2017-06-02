const GameView = require("./gameview");

class Menu {
  constructor(ctx) {
    this.ctx = ctx;
    this.gameview = new GameView(this.ctx, this);
  }

  start() {
    this.ctx.clearRect(0,0,800,600);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,800,600);

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(50, 520, 250, 60);

    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.font="16px Zelda";

    this.ctx.fillText(`Press 'SPACE' to fire an arrow`, 60, 535);
    this.ctx.fillText(`Left and Right arrow keys to move`, 60, 555);
    this.ctx.fillText(`Press 'M' for music`, 60, 575);

    this.eventHandler = () => this.listen();
    document.addEventListener("keydown", this.eventHandler, true);
  }

  listen() {
    console.log(this.gameview.started);
    document.removeEventListener("keydown", this.eventHandler, true);
    if (this.gameview.started === false) {
      this.gameview.start();
      this.gameview.started = true;
      this.gameview.running = true;
    } else {
      this.gameview.animate();
      this.gameview.running = true;
    }
  }

}

module.exports = Menu;
