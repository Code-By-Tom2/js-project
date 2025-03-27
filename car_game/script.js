const gameArea = document.getElementById('game-area');
const car = document.getElementById('car');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const finalScore = document.getElementById('final-score');
const restartButton = document.getElementById('restart');

// Game constants
const GAME_WIDTH = 400;
const CAR_WIDTH = 40;
const CAR_HEIGHT = 60;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_HEIGHT = 60;
const CAR_START_X = (GAME_WIDTH - CAR_WIDTH) / 2;
const CAR_Y = 600 - CAR_HEIGHT - 20; // Car's fixed Y position

let carX = CAR_START_X;
let leftPressed = false;
let rightPressed = false;
let obstacles = [];
let score = 0;
let gameOver = false;
let gameInterval, obstacleInterval;

// Obstacle pool
const obstaclePool = [];
const numObstacles = 5; // Reduced for simplicity
for (let i = 0; i < numObstacles; i++) {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.display = 'none';
    gameArea.appendChild(obstacle);
    obstaclePool.push({ element: obstacle, inUse: false });
}

// Car movement controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = true;
    if (e.key === 'ArrowRight') rightPressed = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') leftPressed = false;
    if (e.key === 'ArrowRight') rightPressed = false;
});

function moveCar() {
    if (leftPressed && carX > 0) carX -= 5; // Increased speed for responsiveness
    if (rightPressed && carX < GAME_WIDTH - CAR_WIDTH) carX += 5;
    car.style.left = carX + 'px';
}

function createObstacle() {
    if (gameOver) return; // Prevent new obstacles after game over
    for (let i = 0; i < obstaclePool.length; i++) {
        if (!obstaclePool[i].inUse) {
            const obstacle = obstaclePool[i];
            obstacle.inUse = true;
            const x = Math.floor(Math.random() * (GAME_WIDTH - OBSTACLE_WIDTH));
            obstacle.element.style.left = x + 'px';
            obstacle.element.style.top = '0px';
            obstacle.element.style.display = 'block';
            obstacles.push({ element: obstacle.element, x: x, y: 0, poolIndex: i });
            break;
        }
    }
}

function moveObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.y += 5;
        obstacle.element.style.top = obstacle.y + 'px';

        // Check if obstacle is off-screen
        if (obstacle.y > 600) {
            obstacle.element.style.display = 'none';
            obstaclePool[obstacle.poolIndex].inUse = false;
            obstacles.splice(i, 1);
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;
        }
        // Collision detection
        else if (
            obstacle.y + OBSTACLE_HEIGHT > CAR_Y &&
            obstacle.y < CAR_Y + CAR_HEIGHT &&
            carX < obstacle.x + OBSTACLE_WIDTH &&
            carX + CAR_WIDTH > obstacle.x
        ) {
            endGame();
        }
    }
}

function gameLoop() {
    if (!gameOver) {
        moveCar();
        moveObstacles();
    }
}

function endGame() {
    gameOver = true;
    finalScore.textContent = `Final Score: ${score}`;
    gameOverScreen.style.display = 'block';
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
}

function startGame() {
    carX = CAR_START_X;
    car.style.left = carX + 'px';
    leftPressed = false;
    rightPressed = false;
    obstacles = [];
    score = 0;
    gameOver = false;
    gameOverScreen.style.display = 'none';
    scoreDisplay.textContent = `Score: 0`;

    obstaclePool.forEach(obstacle => {
        obstacle.element.style.display = 'none';
        obstacle.inUse = false;
    });
    obstacles.forEach(obstacle => obstacle.element.remove()); // Clear any leftover obstacles
    obstacles = [];

    gameInterval = setInterval(gameLoop, 20);
    obstacleInterval = setInterval(createObstacle, 1500); // Slightly faster spawn rate
}

restartButton.addEventListener('click', startGame);

// Start the game
startGame();