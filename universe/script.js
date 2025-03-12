// Get canvas and context
const canvas = document.getElementById('universe');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Star class
class Star {
    constructor(centerX, centerY, radius, angle, speed, size, color) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius; // Orbit radius
        this.angle = angle; // Current angle in radians
        this.speed = speed; // Angular speed
        this.size = size; // Star size
        this.color = color;
        this.x = 0; // Current x position
        this.y = 0; // Current y position
    }

    update() {
        this.angle += this.speed;
        this.x = this.centerX + this.radius * Math.cos(this.angle);
        this.y = this.centerY + this.radius * Math.sin(this.angle);
    }

    draw(ctx, view) {
        const viewX = (this.x - view.offsetX) * view.scale;
        const viewY = (this.y - view.offsetY) * view.scale;
        // Draw glow
        ctx.beginPath();
        ctx.arc(viewX, viewY, this.size * 3 * view.scale, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.fill();
        // Draw star
        ctx.beginPath();
        ctx.arc(viewX, viewY, this.size * view.scale, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Planet class
class Planet {
    constructor(star, radius, angle, speed, size, color) {
        this.star = star; // The star it orbits
        this.radius = radius; // Orbit radius around the star
        this.angle = angle;
        this.speed = speed;
        this.size = size;
        this.color = color;
        this.x = 0;
        this.y = 0;
    }

    update() {
        this.angle += this.speed;
        this.x = this.star.x + this.radius * Math.cos(this.angle);
        this.y = this.star.y + this.radius * Math.sin(this.angle);
    }

    draw(ctx, view) {
        const viewX = (this.x - view.offsetX) * view.scale;
        const viewY = (this.y - view.offsetY) * view.scale;
        ctx.beginPath();
        ctx.arc(viewX, viewY, this.size * view.scale, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Arrays for celestial objects
const stars = [];
const bgStars = [];

// Generate background stars (static)
for (let i = 0; i < 1000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 1 + 0.5;
    const color = `rgba(255,255,255,${Math.random() * 0.5 + 0.5})`;
    bgStars.push({ x, y, size, color });
}

// Generate orbiting stars and planets
const numStars = 300;
for (let i = 0; i < numStars; i++) {
    const radius = Math.random() * 200 + 50; // Orbit radius 50-250
    const angle = Math.random() * 2 * Math.PI;
    const speed = (Math.random() - 0.5) * 0.01; // Angular speed
    const size = Math.random() * 2 + 1;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random bright color
    const star = new Star(centerX, centerY, radius, angle, speed, size, color);
    stars.push(star);

    // Add planets to 20% of stars
    if (Math.random() < 0.2) {
        const numPlanets = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < numPlanets; j++) {
            const planetRadius = Math.random() * 20 + 10;
            const planetAngle = Math.random() * 2 * Math.PI;
            const planetSpeed = (Math.random() - 0.5) * 0.05;
            const planetSize = Math.random() * 3 + 1;
            const planetColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            const planet = new Planet(star, planetRadius, planetAngle, planetSpeed, planetSize, planetColor);
            stars.push(planet);
        }
    }
}

// View state for zooming and panning
const view = { scale: 1, offsetX: 0, offsetY: 0 };

// Animation loop
function animate() {
    // Clear canvas with black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background stars (not affected by view transform)
    bgStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = star.color;
        ctx.fill();
    });

    // Update and draw all stars and planets with view transform
    stars.forEach(obj => {
        obj.update();
        obj.draw(ctx, view);
    });

    requestAnimationFrame(animate);
}

// Start animation
animate();

// Event listeners for user interaction
canvas.addEventListener('wheel', (e) => {
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1; // Zoom out or in
    view.scale *= zoomFactor;

    // Adjust offset to zoom towards mouse position
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    view.offsetX = mouseX / view.scale - (mouseX / view.scale - view.offsetX) / zoomFactor;
    view.offsetY = mouseY / view.scale - (mouseY / view.scale - view.offsetY) / zoomFactor;
});

let isDragging = false;
let lastX, lastY;

canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        view.offsetX -= dx / view.scale;
        view.offsetY -= dy / view.scale;
        lastX = e.clientX;
        lastY = e.clientY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});