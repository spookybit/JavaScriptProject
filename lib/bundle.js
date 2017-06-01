/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);

class GameView {
  constructor(ctx, doc) {
    this.ctx = ctx;
    // this.game = new Game();
    this.document = doc;
    // this.snd = new Audio("./music.wav");
  }

  start() {
    // this.snd.play();
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// need to pass options and draw(ctx)

class Character {
  constructor(options) {
    this.pos = options.pos;
    this.sizex = 50;
    this.sizey = 50;

    this.pic = new Image();
    this.pic.src = "./images/link.png";

  }

  draw(ctx) {
    ctx.drawImage(this.pic, this.pos[0], this.pos[1], this.sizex, this.sizey);

    // ctx.beginPath();
    // ctx.fillStyle = "red";
    // ctx.rect(this.pos[0], this.pos[1], this.sizex, this.sizey);
    // ctx.fill();
  }

  move() {

  }

}

module.exports = Character;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// const Game = require("./game");
const GameView = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('mycanvas');
  const ctx = canvas.getContext('2d');

  // const game = new Game();
  // document.addEventListener("keydown", game.keydown.bind(game));

  new GameView(ctx, document).start();

});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Character = __webpack_require__(1);
const Projectile = __webpack_require__(4);
const Target = __webpack_require__(5);
const Cucco = __webpack_require__(6);

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

    this.snd = document.createElement('audio');
    // this.snd.innerHTML = '<source src="' + './music.wav'+ '" type="audio/mpeg"' + ' loop="true" />';

    // this.snd.innerHTML = '<source src="' + './music.wav'+ '" type="audio/mpeg" />';
    this.snd = new Audio("./music.wav");
    this.snd.loop = true;
    // this.snd.play();
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
    } else if (e.keyCode === 77) {
      if (this.snd.paused) {
        this.snd.play();
      } else {
        this.snd.pause();
      }
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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Projectile {
  constructor(options) {
    this.pos = options.pos;
    this.sizex = 10;
    this.sizey = 30;
    this.pic = new Image();
    this.pic.src = "./images/arrow.png";
  }

  move() {
    this.pos[1] -= 10;
  }

  draw(ctx) {
    ctx.drawImage(this.pic, this.pos[0], this.pos[1], this.sizex, this.sizey);

    // ctx.beginPath();
    // ctx.fillStyle = "pink";
    // ctx.rect(this.pos[0], this.pos[1], this.sizex, this.sizey);
    // ctx.fill();
  }

}

module.exports = Projectile;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Target {
  constructor(pos) {
    this.pos = pos;
    this.sizex = 50;
    this.sizey = 50;

    this.pic = new Image();
    this.pic.src = "./images/rupee.png";
  }

  draw(ctx) {
    ctx.drawImage(this.pic, this.pos[0], this.pos[1], this.sizex, this.sizey);
  }

  move () {

  }

}

module.exports = Target;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Cucco {
  constructor(options) {
    this.pos = [700,100];
    this.sizex = 50;
    this.sizey = 50;
    this.pic = new Image();
    this.pic.src = "./images/cucco.png";
  }

  move() {
    this.pos[0] -= 5;
  }

  draw(ctx) {
    ctx.drawImage(this.pic, this.pos[0], this.pos[1], this.sizex, this.sizey);
  }


}

module.exports = Cucco;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map