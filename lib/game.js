const Character = require("./character");
const Projectile = require("./projectile");
const Target = require("./target");
const Cucco = require("./cucco");

class Game {
  constructor() {
    this.score = 0;
    this.misses = 0;
    this.character = [];
    this.projectile = [];

    const target1 = new Target([200, 200]);
    const target2 = new Target([300, 200]);
    const target3 = new Target([400, 200]);
    const target4 = new Target([500, 200]);
    const cucco = new Cucco();

    this.targetsWaiting = [cucco];
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
      pos: [370,450]
    });

    this.add(char);

    return char;
  }

  addProjectile() {
    if (this.projectile.length <= 1) {
      const posi = this.character[0].pos;
      const projectile = new Projectile({
        pos: [posi[0], posi[1]]
      });
      this.add(projectile);

      return projectile;
    }
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
    // console.log(this.allObjects());
    this.allObjects().forEach((object) => {
      object.move();
    });
  }

  draw(ctx) {
    ctx.clearRect(0,0,800,600);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,800,600);

    this.drawScreen(ctx);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });

    this.drawTitle(ctx);
    this.drawScore(ctx);
    this.drawMisses(ctx);
    this.drawInstructions(ctx);

  }

  drawInstructions(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(50, 520, 250, 50);

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font="16px Zelda";

    ctx.fillText(`Press 'A' to fire an arrow`, 60, 540);
    ctx.fillText(`Left and Right arrow keys to move`, 60, 560);
  }

  drawScreen(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(100,100,600,400);
  }

  drawTitle(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.font="30px Zelda";
    ctx.fillText(`Zelda Shooting Gallery`, 260, 60);
  }

  drawScore(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.font="30px Zelda";
    ctx.fillText(`Score: ${this.score}`, 10, 30);
  }

  drawMisses(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "pink";
    ctx.font="30px Zelda";
    ctx.fillText(`Misses: ${this.misses}`, 10, 60);
  }

  checkCollision() {
    this.targets.forEach((target, idx) => {
      this.projectile.forEach((proj, index) => {
        if ((proj.pos[0] + proj.sizex) > target.pos[0] &&
          proj.pos[0] < (target.pos[0] + target.sizex) &&
          proj.pos[1] > target.pos[1] &&
          proj.pos[1] < target.pos[1] + target.sizey
        ) if (target instanceof Cucco) {
            this.projectile.splice(index, 1);
            let cucco = this.targets.splice(idx, 1);
            cucco[0].pos = [700,100];
            this.targetsWaiting.push(cucco[0]);
            this.score += 100;
        } else {
            clearInterval(this.intervalDisappear);
            this.projectile.splice(index, 1);
            let removed = this.targets.splice(idx, 1);
            this.targetsWaiting.push(removed[0]);
            this.score += 10;
            this.timerDisappear();
          }


      });
    });
  }

  step() {
    this.moveObjects();
    this.deleteObjects();
    this.checkCollision();
    this.gameOver();

  }

  timerDisappear() {
    this.intervalDisappear = setInterval(this.targetDisappear.bind(this), 2000);
  }

  timerReappear() {
    this.intervalReappear = setInterval(this.targetReappear.bind(this), 1500);
  }

  targetDisappear() {
    if (this.targets[0]) {
      let removed = this.targets.splice(0, 1);
      this.targetsWaiting.push(removed[0]);
      this.misses += 1;
    }
  }

  targetReappear() {
    // console.log(this.targetsWaiting);
    let idx = Math.floor(Math.random()*this.targetsWaiting.length);
    let removed = this.targetsWaiting.splice(idx, 1);
    if (removed[0] instanceof Cucco || this.targets.length <= 1) {
      this.targets.push(removed[0]);

      let idx2 = Math.floor(Math.random()*this.targetsWaiting.length);
      let removed2 = this.targetsWaiting.splice(idx2, 1);

      if (removed2[0]) {
        this.targets.push(removed2[0]);
      }
    } else if (removed[0]) {
      this.targets.push(removed[0]);
    }

  }

  deleteObjects() {
    this.allObjects().forEach((object) => {
      if (object instanceof Projectile) {
        if (object.pos[0] < -5 || object.pos[1] < -5) {
          this.projectile.splice(this.projectile.indexOf(object), 1);
        }

      } else if (object instanceof Cucco) {
        if (object.pos[0] < 100) {
          const cucco = this.targets.splice(this.targets.indexOf(object), 1);
          cucco[0].pos = [700,100];
          this.targetsWaiting.push(cucco[0]);
        }
      }
    });
  }

  gameOver() {
    // console.log(this.misses);
    if (this.misses >= 3) {
      return true;
    }
  }

}
//
// Game.X = 800;
// Game.Y = 600;
// Game.IN_X = 800;
// Game.IN_Y = 400;

module.exports = Game;
