const Game = require("./game");

class GameView {
  constructor(ctx, doc) {
    this.ctx = ctx;
    // this.game = new Game();
    this.document = doc;
  }

  start() {
    this.game = new Game();
    this.document.addEventListener("keydown", this.game.keydown.bind(this.game));
    this.game.addCharacter();
    this.game.timerDisappear();
    this.game.timerReappear();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){
    if (!this.game.gameOver()) {
      this.game.step();
      this.game.draw(this.ctx);
    } else {
      location.reload();
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
