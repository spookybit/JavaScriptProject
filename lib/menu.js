const GameView = require("./gameview");

class Menu {
  constructor(ctx) {
    this.ctx = ctx;
    this.gameview = new GameView(this.ctx, this);
    this.scroll = 0;

    this.background = new Image();
    this.background.src = "./assets/images/background.png";

    this.pic = new Image();
    this.pic.src = "./assets/images/navi.png";
    // this.pic.onload = function() {
    //   this.ctx.drawImage(this.pic, 400, 10, 150, 150);
    //   console.log("why?")
    // }
  }

  gameover() {
    setTimeout(this.start.bind(this), 1000);
    // this.ctx.drawImage(this.background, 0, 0, 800, 600);
  }

  scrollText() {
    if (this.scroll == 0) {
      this.ctx.clearRect(0,0,800,600);
      this.ctx.drawImage(this.background, 0, 0, 800, 600);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0,0,800,100);

      this.ctx.beginPath();
      this.ctx.fillStyle = "yellow";
      this.ctx.font="30px Zelda";
      this.ctx.fillText(`Score: 0`, 10, 60);
      this.ctx.fillText(`Escaped Targets Left: 10`, 10, 90);
      this.ctx.fillText(`Zelda Shooting Gallery`, 260, 60);

      this.ctx.fillText(`Hey! Listen!`, 330, 300);
      this.ctx.fillText(`Press Space to start`, 200, 350);

      setTimeout(this.navi.bind(this), 10);

      this.scroll = 1;
    } else if (this.scroll == 1) {
      this.ctx.clearRect(0,0,800,600);
      this.ctx.drawImage(this.background, 0, 0, 800, 600);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0,0,800,100);

      this.ctx.fillStyle = "yellow";
      this.ctx.font="30px Zelda";
      this.ctx.fillText(`Score: 0`, 10, 60);
      this.ctx.fillText(`Escaped Targets Left: 10`, 10, 90);
      this.ctx.fillText(`Zelda Shooting Gallery`, 260, 60);
      this.ctx.fillText(`You have an important mission`, 170, 300);
      this.ctx.fillText(`Press Space to start`, 200, 350);

      this.navi();

      this.scroll = 2
    } else if (this.scroll == 2) {
      this.ctx.clearRect(0,0,800,600);
      this.ctx.drawImage(this.background, 0, 0, 800, 600);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0,0,800,100);

      this.ctx.fillStyle = "yellow";
      this.ctx.font="30px Zelda";
      this.ctx.fillText(`Score: 0`, 10, 60);
      this.ctx.fillText(`Escaped Targets Left: 10`, 10, 90);
      this.ctx.fillText(`Zelda Shooting Gallery`, 260, 60);
      this.ctx.fillText(`Shoot as many rupees and cuccos as you can`, 170, 300);
      this.ctx.fillText(`Press Space to start`, 200, 350);

      this.navi();

      this.scroll = 3
    } else if (this.scroll == 3) {
      this.ctx.clearRect(0,0,800,600);
      this.ctx.drawImage(this.background, 0, 0, 800, 600);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0,0,800,100);

      this.ctx.fillStyle = "yellow";
      this.ctx.font="30px Zelda";
      this.ctx.fillText(`Score: 0`, 10, 60);
      this.ctx.fillText(`Escaped Targets Left: 10`, 10, 90);
      this.ctx.fillText(`Zelda Shooting Gallery`, 260, 60);
      this.ctx.fillText(`If you're too slow, the targets will escape`, 170, 300);
      this.ctx.fillText(`Press Space to start`, 200, 350);

      this.navi();

      this.scroll = 4
    } else if (this.scroll == 4) {
      this.ctx.clearRect(0,0,800,600);
      this.ctx.drawImage(this.background, 0, 0, 800, 600);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0,0,800,100);

      this.ctx.fillStyle = "yellow";
      this.ctx.font="30px Zelda";
      this.ctx.fillText(`Score: 0`, 10, 60);
      this.ctx.fillText(`Escaped Targets Left: 10`, 10, 90);
      this.ctx.fillText(`Zelda Shooting Gallery`, 260, 60);
      this.ctx.fillText(`Miss 10, and it's game over`, 170, 300);
      this.ctx.fillText(`Press Space to start`, 200, 350);

      this.navi();

      this.scroll = 5
    } else {
      this.scroll = 0;
      this.listen();
    }
  }

  navi() {
    this.ctx.drawImage(this.pic, 600, 100, 150, 150);
  }

  start() {
    this.ctx.drawImage(this.background, 0, 0, 800, 600);

    setTimeout(this.scrollText.bind(this), 50);
    setTimeout(this.navi.bind(this), 50);

    this.eventHandler = () => this.scrollText();
    document.addEventListener("keydown", this.eventHandler, true);
  }

  listen() {
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
