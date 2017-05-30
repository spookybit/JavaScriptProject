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
      pos: [370,550]
    });

    this.add(char);

    return char;
  }

  allObjects() {
    return [].concat(this.character);
  }

  keydown(e) {
    if (e.keyCode === 37) {
      this.character[0].pos[0] -= 10;
    } else if (e.keyCode === 39) {
       this.character[0].pos[0] += 10;
    }
  }

  moveObjects() {
    this.allObjects().forEach((object) => {
      object.move();
    });
  }

  draw(ctx) {
    ctx.clearRect(0,0,800,600);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,800,600);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  step() {
    this.moveObjects();
  }

}

module.exports = Game;
