// initialize variables
const gameContainer = document.querySelector(".game-container");
let snake = [
   [10, 16],
   [10, 17],
   [10, 18],
];
let apple = [5, 5];
let direction = "n";
let tiles = [];
let score = 0;

// constructing all tiles
const constructTiles = () => {
   // 1-20 range for X and Y
   for (let Y = 1; Y <= 20; Y++) {
      for (let X = 1; X <= 20; X++) {
         const tile = document.createElement("div");
         tile.classList.add("tile", `x${X}y${Y}`);
         tiles.push(tile);
      }
   }
   // then add it to the game container
   for (let el of tiles) {
      gameContainer.appendChild(el);
   }
};

// drawing the snake
const drawSnake = () => {
   for (let body of snake) {
      const snakePart = document.querySelector(`.x${body[0]}y${body[1]}`);
      snakePart.classList.add("snake");
   }
};

// drawning the apple
const drawApple = () => {
   const appleElem = document.querySelector(`.x${apple[0]}y${apple[1]}`);
   appleElem.classList.add("apple");
};

const snakeDirection = () => {
   let head;
   switch (direction) {
      case "n":
         head = [snake[0][0], snake[0][1] - 1];
         break;
      case "s":
         head = [snake[0][0], snake[0][1] + 1];
         break;
      case "o":
         head = [snake[0][0] - 1, snake[0][1]];
         break;
      case "e":
         head = [snake[0][0] + 1, snake[0][1]];
         break;
      default: {
      }
   }
   // add a new head in the direction of the next movement
   snake.unshift(head);
   const lastPart = document.querySelector(
      `.x${snake[snake.length - 1][0]}y${snake[snake.length - 1][1]}`
   );
   // deleting the last part
   lastPart.classList.remove("snake");
   snake.pop();
   // return true if game over
   return gameOver();
};

const changeDirection = () => {
   window.addEventListener("keypress", (event) => {
      switch (event.key) {
         case "z": {
            direction = "n";
            break;
         }
         case "s": {
            direction = "s";
            break;
         }
         case "q": {
            direction = "o";
            break;
         }
         case "d": {
            direction = "e";
            break;
         }
         default: {
         }
      }
   });
};

const gameOver = () => {
   const [head, ...body] = snake;

   if (head[0] > 20 || head[1] > 20 || head[0] < 1 || head[1] < 1) {
      alert("game over!");
      return true;
   }
   for (let part of body) {
      if (head[0] == part[0] && head[1] == part[1]) {
         alert("game over!");
         return true;
      }
   }
   return false;
};

// increment the snake
const appleEated = () => {
   if (snake[0][0] == apple[0] && snake[0][1] == apple[1]) {
      snake.unshift([apple[0], apple[1]]);
      score++;
      respawnApple();
   }
};

// respawn of the apple
const respawnApple = () => {
   const lastApple = document.querySelector(`.x${apple[0]}y${apple[1]}`);
   lastApple.classList.remove("apple");

   let appleX = Math.round(Math.random() * 19 + 1);
   let appleY = Math.round(Math.random() * 19 + 1);
   // recall the function if the apple spawn in the snake part
   for (let body of snake) {
      if (appleX == body[0] && appleY == body[1]) {
         return respawnApple();
      }
   }
   apple[0] = appleX;
   apple[1] = appleY;
};

const refreshScore = () => {
   const scoreElem = document.querySelector(".x2y2");
   scoreElem.innerHTML = `<p>${score}</p>`;
};

constructTiles();
snakeDirection();
drawSnake();
drawApple();
changeDirection();

const updatePosition = () => {
   // if game over, stop refreshing the game
   if (!snakeDirection()) {
      drawApple();
      drawSnake();
      appleEated();
      refreshScore();

      setTimeout(updatePosition, 125);
   }
};

updatePosition();
