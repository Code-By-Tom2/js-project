// Set up canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const width = canvas.width;
const height = canvas.height;
const playerSpeed = 5;
const bulletSpeed = 7;
const enemySpeed = 2;
const enemyRows = 5;
const enemyCols = 10;

// Load images for spaceship and enemies
const spaceshipImg = new Image();
spaceshipImg.src = "assets/spaceship.png";  // Replace with your local or online image path

const enemyImg = new Image();
enemyImg.src = "assets/alien.png";  // Replace with your local or online image path

// Player setup
const playerWidth = 50;
const playerHeight = 50;
let playerX = width / 2 - playerWidth / 2;
let playerY = height - playerHeight - 10;

// Bullet setup
let bullets = [];
let enemies = [];
let playerDirection = 0; // 1 for right, -1 for left, 0 for no movement

// Initialize enemies
function initializeEnemies() {
  enemies = [];
  for (let row = 0; row < enemyRows; row++) {
    for (let col = 0; col < enemyCols; col++) {
      enemies.push({
        x: col * 60 + 50,
        y: row * 40 + 30,
        width: 40,
        height: 40,
        image: enemyImg
      });
    }
  }
}

// Wait for images to load before starting the game
spaceshipImg.onload = () => {
  enemyImg.onload = () => {
    initializeEnemies();
    gameLoop(); // Start the game loop after images are loaded
  };
};

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  // Draw player spaceship
  ctx.drawImage(spaceshipImg, playerX, playerY, playerWidth, playerHeight);

  // Move player based on direction
  if (playerDirection === 1 && playerX + playerWidth < width) {
    playerX += playerSpeed;
  } else if (playerDirection === -1 && playerX > 0) {
    playerX -= playerSpeed;
  }

  // Update and draw bullets
  bullets.forEach((bullet, index) => {
    bullet.y -= bulletSpeed;
    if (bullet.y < 0) {
      bullets.splice(index, 1);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(bullet.x, bullet.y, 5, 10);
  });

  // Update and draw enemies
  enemies.forEach((enemy, index) => {
    ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
    enemy.y += enemySpeed;  // Move enemy downward

    // Check if enemy hits player
    if (
      enemy.x < playerX + playerWidth &&
      enemy.x + enemy.width > playerX &&
      enemy.y < playerY + playerHeight &&
      enemy.y + enemy.height > playerY
    ) {
      gameOver();
    }
  });

  // Collision detection: Check if bullets hit enemies
  bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + 5 > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + 10 > enemy.y
      ) {
        // Remove enemy and bullet on collision
        enemies.splice(enemyIndex, 1);
        bullets.splice(bulletIndex, 1);
      }
    });
  });

  // If all enemies are defeated, you win
  if (enemies.length === 0) {
    gameWin();
  }

  // Request next frame
  requestAnimationFrame(gameLoop);
}

// Event listeners for player controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    playerDirection = 1;
  } else if (e.key === "ArrowLeft") {
    playerDirection = -1;
  } else if (e.key === " ") {
    bullets.push({ x: playerX + playerWidth / 2 - 2.5, y: playerY });
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    playerDirection = 0;
  }
});

// Game over condition
function gameOver() {
  document.getElementById("gameOver").style.display = "block";
  cancelAnimationFrame(gameLoop);  // Stop the game loop
}

// Game win condition
function gameWin() {
  document.getElementById("gameWin").style.display = "block";
  cancelAnimationFrame(gameLoop);  // Stop the game loop
}

// Initialize the game by resetting everything
function resetGame() {
  playerX = width / 2 - playerWidth / 2;
  playerY = height - playerHeight - 10;
  bullets = [];
  initializeEnemies();
  gameLoop();
}
