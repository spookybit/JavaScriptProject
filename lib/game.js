const Character = require("./character");

class Game {
  constructor() {
    this.character = [];
  }

  add(object) {
    if (object instanceof Character) {
      this.character.push(object);
    }
  }

  addCharacter() {
    const char = new Character({
      pos: [0,0]
      // game: this
    });

    this.add(char);

    return char;
  }

  allObjects() {
    return [].concat(this.character);
  }

  draw(ctx) {
    ctx.clearRect(0,0,800,600);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,800,600);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

}

module.exports = Game;
