const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.8;
let score = 0;
let level = 1;
let gameRunning = true;

// Load assets
const marioImg = new Image();
marioImg.src = "mario.png";

const goombaImg = new Image();
goombaImg.src = "goomba.png";

const koopaImg = new Image();
koopaImg.src = "koopa.png";

const backgroundImg = new Image();
backgroundImg.src = "background.jpg";

const coinImg = new Image();
coinImg.src = "coin.png";

const mario = {
  x: 50,
  y: 300,
  width: 40,
  height: 50,
  dx: 0,
  dy: 0,
  speed: 5,
  jumpPower: 15,
  grounded: false,
  poweredUp: false,
  draw() {
    ctx.drawImage(marioImg, this.x, this.y, this.width, this.height);
  },
  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (!this.grounded) this.dy += gravity;
    if (this.y + this.height >= canvas.height) {
      this.y = canvas.height - this.height;
      this.grounded = true;
      this.dy = 0;
    }

    if (this.x < 0) this.x = 0;
    if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
  },
};

// Enemies
const goombas = [
  { x: 400, y: 350, width: 40, height: 40, dx: -2 },
];

const koopas = [
  { x: 600, y: 350, width: 40, height: 40, dx: -2, shell: false },
];

// Coins
const coins = [
  { x: 200, y: 300, width: 20, height: 20 },
  { x: 500, y: 250, width: 20, height: 20 },
];

// Power-ups
const powerUps = [
  { x: 300, y: 350, width: 20, height: 20, type: "mushroom" },
];

// Controls
const keys = {};
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// Game logic
function drawBackground() {
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

function drawCoins() {
  coins.forEach((coin) => ctx.drawImage(coinImg, coin.x, coin.y, coin.width, coin.height));
}

function drawEnemies(enemies, img) {
  enemies.forEach((enemy) => {
    ctx.drawImage(img, enemy.x, enemy.y, enemy.width, enemy.height);
    enemy.x += enemy.dx;

    // Respawn enemies
    if (enemy.x + enemy.width < 0) enemy.x = canvas.width + Math.random() * 100;
  });
}

function drawPowerUps() {
  powerUps.forEach((powerUp) => {
    ctx.fillStyle = powerUp.type === "mushroom" ? "red" : "orange";
    ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
  });
}

function checkCollision(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

function handleCollisions() {
  // Coin collection
  coins.forEach((coin, index) => {
    if (checkCollision(mario, coin)) {
      coins.splice(index, 1);
      score += 10;
      document.getElementById("score").textContent = score;
    }
  });

  // Power-up collection
  powerUps.forEach((powerUp, index) => {
    if (checkCollision(mario, powerUp)) {
      powerUps.splice(index, 1);
      mario.poweredUp = true;
      setTimeout(() => (mario.poweredUp = false), 10000); // Power-up lasts 10 seconds
    }
  });

  // Goomba collision
  goombas.forEach((goomba) => {
    if (checkCollision(mario, goomba)) {
      if (mario.dy > 0) {
        // Stomp Goomba
        goomba.x = canvas.width + Math.random() * 100;
        mario.dy = -10;
        score += 20;
        document.getElementById("score").textContent = score;
      } else {
        // Game over
        gameRunning = false;
        alert("Game Over!");
        window.location.reload();
      }
    }
  });
}

function gameLoop() {
  if (!gameRunning) return;

  drawBackground();
  mario.update();
  mario.draw();

  drawEnemies(goombas, goombaImg);
  drawEnemies(koopas, koopaImg);
  drawCoins();
  drawPowerUps();

  handleCollisions();

  // Update Mario controls
  mario.dx = keys["ArrowRight"] ? mario.speed : keys["ArrowLeft"] ? -mario.speed : 0;
  if (keys[" "]) mario.dy = mario.grounded ? -mario.jumpPower : mario.dy;
  mario.grounded = mario.y + mario.height >= canvas.height;

  requestAnimationFrame(gameLoop);
}

gameLoop();
