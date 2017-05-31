const Character = require("./character");
const Projectile = require("./projectile");
const Target = require("./target");

class Game {
  constructor() {
    this.score = 0;
    this.misses = 0;
    this.character = [];
    this.projectile = [];
    this.targetsWaiting = [];

    const target1 = new Target([200, 200]);
    const target2 = new Target([300, 200]);
    const target3 = new Target([400, 200]);
    const target4 = new Target([500, 200]);

    this.targets = [target1, target2, target3, target4];
  }

  add(object) {
    if (object instanceof Character) {
      this.character.push(object);
    } else if (object instanceof Projectile) {
      this.projectile.push(object);
    }
  }

  addCharacter() {
    const char = new Character({
      pos: [370,550]
    });

    this.add(char);

    return char;
  }

  addProjectile() {
    const posi = this.character[0].pos;
    const projectile = new Projectile({
      pos: [posi[0], posi[1]]
    });
    this.add(projectile);

    return projectile;
  }

  allObjects() {
    return [].concat(this.character, this.projectile, this.targets);
  }

  keydown(e) {
    if (e.keyCode === 37) {
      this.character[0].pos[0] -= 10;
    } else if (e.keyCode === 39) {
       this.character[0].pos[0] += 10;
    } else if (e.keyCode === 65) {
      this.addProjectile();
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

    // setinterval()?
  }

  checkCollision() {
    this.targets.forEach((target, idx) => {
      this.projectile.forEach((proj, index) => {
        if ((proj.pos[0] + proj.sizex) > target.pos[0] &&
          proj.pos[0] < (target.pos[0] + target.sizex) &&
          proj.pos[1] > target.pos[1] &&
          proj.pos[1] < target.pos[1] + target.sizey
        ) {
            let removed = this.targets.splice(idx, 1);
            this.targetsWaiting.push(removed);
            this.score += 10;
          }


      });
    });
  }

  step() {
    this.moveObjects();
    this.deleteObjects();
    this.checkCollision();
  }

  deleteObjects() {
    this.allObjects().forEach((object) => {
      if (object instanceof Projectile) {
        if (object.pos[0] < -5 || object.pos[1] < -5) {
          this.projectile.splice(this.projectile.indexOf(object), 1);
        }

      }
    });
  }

}
//
// Game.X = 800;
// Game.Y = 600;
// Game.IN_X = 800;
// Game.IN_Y = 400;

module.exports = Game;
