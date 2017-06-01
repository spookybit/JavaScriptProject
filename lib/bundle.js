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
  }

  start() {
    this.game = new Game();
    this.document.addEventListener("keydown", this.game.keydown.bind(this.game));
    this.game.addCharacter();
    // this.game.timerDisappear();
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

    this.targetsWaiting = [target1, target2, target3, target4];
    this.targets = [];
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
      console.log(this.projectile);
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

    this.drawScreen(ctx);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });

    this.drawTitle(ctx);
    this.drawScore(ctx);
    this.drawMisses(ctx);

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
        ) {
            clearInterval(this.intervalDisappear);
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
    let idx = Math.floor(Math.random()*this.targetsWaiting.length);
    let removed = this.targetsWaiting.splice(idx, 1);
    if (removed[0]) {
      this.targets.push(removed[0]);
    }

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map