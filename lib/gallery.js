const Game = require("./game");
const GameView = require("./gameview");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('mycanvas');
  const ctx = canvas.getContext('2d');

  const game = new Game();
  document.addEventListener("keydown", game.keydown.bind(game));

  new GameView(game, ctx).start();

});
