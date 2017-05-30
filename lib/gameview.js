class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.character = this.game.addCharacter();
  }

  start() {
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){
    this.game.step();
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;
