const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const prizes = ["$100", "Free Coffee", "Discount Coupon", "Free Gift"];
document.getElementById("prize").innerText = prizes[Math.floor(Math.random() * prizes.length)];
let isDrawing = false;

function setupCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = "#bbb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function startScratch(event) {
    isDrawing = true;
    scratch(event);
}

function scratch(event) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX || event.touches[0].clientX) - rect.left;
    const y = (event.clientY || event.touches[0].clientY) - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
}

function stopScratch() {
    isDrawing = false;
}

function resetScratchCard() {
    setupCanvas();
    document.getElementById("prize").innerText = prizes[Math.floor(Math.random() * prizes.length)];
}

document.getElementById("resetButton").addEventListener("click", resetScratchCard);

canvas.addEventListener("mousedown", startScratch);
canvas.addEventListener("mousemove", scratch);
canvas.addEventListener("mouseup", stopScratch);
canvas.addEventListener("touchstart", startScratch);
canvas.addEventListener("touchmove", scratch);
canvas.addEventListener("touchend", stopScratch);

setupCanvas();
