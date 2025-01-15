const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
const basket = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 80,
  width: 100,
  height: 20,
  color: 'yellow',
  speed: 20
};
const stars = [];
const bombs = [];
let score = 0;
let gameOver = false;
let starSpawned = true;

// Helper functions
function drawBasket() {
  ctx.fillStyle = basket.color;
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function createStar() {
  if (!starSpawned) {
    stars.push({
      x: Math.random() * canvas.width,
      y: 0,
      radius: 10,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: Math.random() * 3 + 2,
      rotation: 0,
      rotationSpeed: Math.random() * 0.1 + 0.05
    });
    starSpawned = true;
  }
}

function createBomb() {
  bombs.push({
    x: Math.random() * canvas.width,
    y: 0,
    radius: 10,
    color: 'red',
    speed: Math.random() * 3 + 2
  });
}

function drawCircle(obj) {
  ctx.save();
  ctx.translate(obj.x, obj.y);
  ctx.rotate(obj.rotation);
  ctx.fillStyle = obj.color;
  ctx.beginPath();
  ctx.arc(0, 0, obj.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function updateObjects(array, isStar = false) {
  for (let i = 0; i < array.length; i++) {
    const obj = array[i];
    obj.y += obj.speed;
    if (isStar) obj.rotation += obj.rotationSpeed;

    // Remove if off-screen
    if (obj.y > canvas.height) {
      array.splice(i, 1);
      i--;
      if (isStar) starSpawned = false;
    }

    drawCircle(obj);
  }
}

function detectCollision(obj) {
  return (
    obj.x > basket.x &&
    obj.x < basket.x + basket.width &&
    obj.y + obj.radius > basket.y &&
    obj.y < basket.y + basket.height
  );
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBasket();

  // Update and draw stars
  updateObjects(stars, true);
  for (let i = 0; i < stars.length; i++) {
    if (detectCollision(stars[i])) {
      score += 10;
      stars.splice(i, 1);
      i--;
      starSpawned = false;
      document.getElementById('score').textContent = score;
    }
  }

  // Update and draw bombs
  updateObjects(bombs);
  for (let i = 0; i < bombs.length; i++) {
    if (detectCollision(bombs[i])) {
      gameOver = true;
      document.getElementById('gameOver').style.display = 'block';
      return;
    }
  }

  requestAnimationFrame(update);
}

// Player controls
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && basket.x > 0) {
    basket.x -= basket.speed;
  } else if (e.key === 'ArrowRight' && basket.x < canvas.width - basket.width) {
    basket.x += basket.speed;
  }
});

// Spawn objects
setInterval(createStar, 1000);
setInterval(createBomb, 3000);

// Start game loop
update();
