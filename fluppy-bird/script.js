const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load multiple image options
const birdImages = [
    'bird1.png',   // First bird image
    'bird2.png',   // Second bird image (flapping animation)
    'bird3.png',   // Third bird image (flapping animation)
];

const pipeImages = [
    'pipe1.png',   // First pipe style
    'pipe2.png',   // Second pipe style
];

const backgroundImages = [
    'background1.png', // First background style
    'background2.png', // Second background style
];

const groundImages = [
    'ground1.png',   // First ground style
    'ground2.png',   // Second ground style
];

// Select random images
function getRandomImage(imagesArray) {
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    const image = new Image();
    image.src = imagesArray[randomIndex];
    return image;
}

// Game settings
const GRAVITY = 0.6;
const FLAP_STRENGTH = -12;
const PIPE_WIDTH = 50;
const PIPE_SPACING = 200;
const PIPE_HEIGHT_MIN = 50;
const PIPE_HEIGHT_MAX = 300;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 40;

// Bird setup
let bird = {
    x: 50,
    y: canvas.height / 2,
    width: BIRD_WIDTH,
    height: BIRD_HEIGHT,
    velocity: 0,
    lift: FLAP_STRENGTH,
    frame: 0, // Frame for bird animation
    image: getRandomImage(birdImages), // Random bird image
};

// Pipe setup
let pipes = [];
let score = 0;
let gameOver = false;

// Randomly select images for pipes, background, and ground
let pipeImage = getRandomImage(pipeImages);
let backgroundImage = getRandomImage(backgroundImages);
let groundImage = getRandomImage(groundImages);

// Handle bird jump
document.addEventListener("keydown", () => {
    if (!gameOver) {
        bird.velocity = bird.lift;
    }
});

// Game loop
function gameLoop() {
    if (gameOver) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Bird flap animation
    bird.velocity += GRAVITY; // Apply gravity
    bird.y += bird.velocity;

    // Draw bird with animation (flapping)
    bird.frame = (bird.frame + 1) % 3;  // 3 frames for the bird's flapping
    ctx.drawImage(bird.image, bird.frame * BIRD_WIDTH, 0, BIRD_WIDTH, BIRD_HEIGHT, bird.x, bird.y, BIRD_WIDTH, BIRD_HEIGHT);

    // Draw and move pipes
    if (Math.random() < 0.02) {
        createPipe();
    }

    pipes.forEach((pipe, index) => {
        pipe.x -= 2;
        ctx.drawImage(pipeImage, 0, 0, PIPE_WIDTH, pipe.topHeight, pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
        ctx.drawImage(pipeImage, 0, 0, PIPE_WIDTH, pipe.bottomHeight, pipe.x, canvas.height - pipe.bottomHeight, PIPE_WIDTH, pipe.bottomHeight);

        // Detect collision with pipes
        if (pipe.x < bird.x + bird.width && pipe.x + PIPE_WIDTH > bird.x && 
            (bird.y < pipe.topHeight || bird.y + bird.height > canvas.height - pipe.bottomHeight)) {
            gameOver = true;
        }

        // Remove passed pipes and update score
        if (pipe.x + PIPE_WIDTH < 0) {
            pipes.splice(index, 1);
            score++;
        }
    });

    // Draw ground
    ctx.drawImage(groundImage, 0, canvas.height - 50, canvas.width, 50);

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // Check if the bird hits the ground
    if (bird.y + bird.height > canvas.height - 50) {
        gameOver = true;
    }

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Create a new pipe
function createPipe() {
    const topHeight = Math.floor(Math.random() * (PIPE_HEIGHT_MAX - PIPE_HEIGHT_MIN) + PIPE_HEIGHT_MIN);
    const bottomHeight = canvas.height - topHeight - PIPE_SPACING;

    pipes.push({
        x: canvas.width,
        topHeight: topHeight,
        bottomHeight: bottomHeight
    });
}

// Start the game loop
gameLoop();
