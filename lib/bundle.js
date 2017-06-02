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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(5);
// const Menu = require("./menu");


class GameView {
  constructor(ctx, menu) {
    this.ctx = ctx;
    this.game = new Game();
    this.menu = menu;
    this.started = false;
    this.running = true;
    this.game.keydown = this.game.keydown.bind(this.game);
    // document.addEventListener("keydown", this.game.keydown.bind(this.game));
  }

  start() {
    this.eventHandler = (e) => this.game.keydown(e);
    document.addEventListener("keydown", this.eventHandler, true);

    this.game.addCharacter();
    this.game.addTargets();
    this.game.playMusic();
    this.game.timerDisappear();
    this.game.timerReappear();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){
    if (this.running) {
      if (!this.game.gameOver()) {
        this.game.step();
        this.game.draw(this.ctx);
      } else {
        // document.removeEventListener("keydown", this.eventHandler, true);
        this.running = false;
        this.menu.start();
        this.game.misses = 10;
        this.game.score = 0;
        return;
      }

    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(0);

class Menu {
  constructor(ctx) {
    this.ctx = ctx;
    this.gameview = new GameView(this.ctx, this);
  }

  start() {
    this.ctx.clearRect(0,0,800,600);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0,0,800,600);

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(50, 520, 250, 60);

    this.ctx.beginPath();
    this.ctx.fillStyle = "black";
    this.ctx.font="16px Zelda";

    this.ctx.fillText(`Press 'SPACE' to fire an arrow`, 60, 535);
    this.ctx.fillText(`Left and Right arrow keys to move`, 60, 555);
    this.ctx.fillText(`Press 'M' for music`, 60, 575);

    this.eventHandler = () => this.listen();
    document.addEventListener("keydown", this.eventHandler, true);
  }

  listen() {
    console.log(this.gameview.started);
    document.removeEventListener("keydown", this.eventHandler, true);
    if (this.gameview.started === false) {
      this.gameview.start();
      this.gameview.started = true;
      this.gameview.running = true;
    } else {
      this.gameview.animate();
      this.gameview.running = true;
    }
  }

}

module.exports = Menu;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// need to pass options and draw(ctx)

class Character {
  constructor() {
    this.pos = [370,400];
    this.sizex = 75;
    this.sizey = 90;

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
    if (this.pos[0] < 1) {
      this.pos[0] = 1;
    } else if (this.pos[0] + this.sizex > 799) {
        this.pos[0] = 799 - this.sizex;
      }
  }

}

module.exports = Character;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Cucco {
  constructor(options) {
    this.pos = [800,100];
    this.sizex = 60;
    this.sizey = 60;
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// const Game = require("./game");
// const GameView = require("./gameview");
const Menu = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('mycanvas');
  const ctx = canvas.getContext('2d');

  // const game = new Game();
  // document.addEventListener("keydown", game.keydown.bind(game));
  // debugger;
  new Menu(ctx).start();
  // new GameView(ctx, document).start();

});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Character = __webpack_require__(2);
const Projectile = __webpack_require__(6);
const Target = __webpack_require__(7);
const Cucco = __webpack_require__(3);

class Game {
  constructor() {
    this.score = 0;
    this.misses = 10;
    this.character = [];
    this.projectile = [];
    this.targetsWaiting = [];
    this.targets = [];
    this.darudeModeOn = false;
    this.darude = new Audio("./audio/darude_sandstorm.wav");
    this.darude.loop = true;

    this.cucco = new Audio("./audio/cucco_cry.wav");
  }

  playMusic() {
    // this.snd.innerHTML = '<source src="' + './music.wav'+ '" type="audio/mpeg"' + ' loop="true" />';
    // this.snd.innerHTML = '<source src="' + './music.wav'+ '" type="audio/mpeg" />';
    this.snd = document.createElement('audio');
    this.snd = new Audio("./audio/music.wav");
    this.snd.loop = true;
    // this.snd.play();
  }

  darudeMode() {
    if (this.score > 200 && this.darudeModeOn === false && !this.snd.paused) {
      this.snd.pause();
      // this.darude = document.createElement('audio');
      // this.darude = new Audio("./darude_sandstorm.wav");
      // this.darude.loop = true;
      this.darudeModeOn = true;
      this.darude.play();
    }
  }

  add(object) {
    if (object instanceof Character) {
      this.character.push(object);
    } else if (object instanceof Projectile) {
      this.projectile.push(object);
    }
  }

  addCharacter() {
    const char = new Character();

    this.add(char);

    return char;
  }

  addTargets() {
    const target1 = new Target([200, 200]);
    const target2 = new Target([300, 200]);
    const target3 = new Target([400, 200]);
    const target4 = new Target([500, 200]);
    const cucco = new Cucco();

    this.targetsWaiting = [cucco];
    this.targets = [target1, target2, target3, target4];

  }

  addProjectile() {
    if (this.projectile.length <= 1) {
      const posi = this.character[0].pos;
      const projectile = new Projectile({
        pos: [posi[0]+ 20, posi[1]]
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
    } else if (e.keyCode === 32) { //65
      this.addProjectile();
    } else if (e.keyCode === 77) {
      if (this.darude.paused && this.darudeModeOn === true) {
        this.darude.play();
      } else if (!this.darude.paused && this.darudeModeOn === true) {
        this.darude.pause();
      } else if (this.snd.paused && this.darudeModeOn === false) {
        this.snd.play();
      } else if (!this.snd.paused && this.darudeModeOn === false){
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
    ctx.fillRect(50, 520, 250, 60);

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font="16px Zelda";

    ctx.fillText(`Press 'SPACE' to fire an arrow`, 60, 535);
    ctx.fillText(`Left and Right arrow keys to move`, 60, 555);
    ctx.fillText(`Press 'M' for music`, 60, 575);
  }

  drawScreen(ctx) {
    const pic = new Image();
    pic.src = "./images/mapscreen.png";
    ctx.drawImage(pic, 0 , 100);
  }

  drawTitle(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.font="30px Zelda";
    ctx.fillText(`Zelda Shooting Gallery`, 260, 60);
  }

  drawScore(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.font="30px Zelda";
    ctx.fillText(`Score: ${this.score}`, 10, 30);
  }

  drawMisses(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
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
            if (!this.snd.paused || !this.darude.paused) {
              this.cucco.play();
            }
            this.darudeMode();
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
    // this.gameOver();

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
      this.misses -= 1;
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
        if (object.pos[1] < 80) {
          this.projectile.splice(this.projectile.indexOf(object), 1);
          this.score -= 30;
        }

      } else if (object instanceof Cucco) {
        if (object.pos[0] < 0) {
          const cucco = this.targets.splice(this.targets.indexOf(object), 1);
          cucco[0].pos = [800,100];
          this.targetsWaiting.push(cucco[0]);
          this.score -= 30;
        }
      }
    });
  }

  gameOver() {
    // console.log(this.misses);
    if (this.misses <= 0) {
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
/* 6 */
/***/ (function(module, exports) {

class Projectile {
  constructor(options) {
    this.pos = options.pos;
    this.sizex = 20;
    this.sizey = 50;
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
/* 7 */
/***/ (function(module, exports) {

class Target {
  constructor(pos) {
    this.pos = pos;
    this.sizex = 40;
    this.sizey = 55;

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