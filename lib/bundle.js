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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Character = __webpack_require__(2);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// need to pass options and draw(ctx)

class Character {
  constructor(options) {
    this.pos = options.pos;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(this.pos[0], this.pos[1], 50, 50);
    ctx.fill();
  }

  move() {

  }

}

module.exports = Character;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const GameView = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('mycanvas');
  const ctx = canvas.getContext('2d');

  const game = new Game();
  document.addEventListener("keydown", game.keydown.bind(game));

  new GameView(game, ctx).start();

});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map