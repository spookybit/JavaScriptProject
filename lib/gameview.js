const Game = require("./game");

class GameView {
  constructor(ctx, doc) {
    this.ctx = ctx;
    this.document = doc;
    this.game = new Game();
    this.document.addEventListener("keydown", this.game.keydown.bind(this.game));
    // this.document.addEventListener("keydown", this.menu.bind(this));
  }
  //
  // menu(e) {
  //   if (e.keyCode) {
  //     this.start();
  //   } else {
  //     requestAnimationFrame(this.menu.bind(this));
  //   }
  // }

  // checkStart(e) {
  //   if (e.keyCode === 32) {
  //     this.start();
  //   }
  //   return true;
  // }

  start() {
    this.game.addCharacter();
    this.game.addTargets();
    this.game.playMusic();
    this.game.timerDisappear();
    this.game.timerReappear();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){
    // if (!this.game.gameOver()) {
      this.game.step();
      this.game.draw(this.ctx);
    // } else {
      // location.reload();
      // return;
      // this.ctx.clearRect(0,0,800, 600);
      // return;
    // }

    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
