const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const socket = io();
let drawing = false;
let color = document.getElementById('colorPicker').value;
let size = document.getElementById('sizePicker').value;

document.getElementById('colorPicker').addEventListener('input', (e) => color = e.target.value);
document.getElementById('sizePicker').addEventListener('input', (e) => size = e.target.value);
document.getElementById('clearCanvas').addEventListener('click', clearCanvas);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ctx.moveTo(x, y);
}

function stopDrawing() {
    drawing = false;
}

function draw(event) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.stroke();

    socket.emit('draw', { x, y, color, size });
    ctx.beginPath();
    ctx.moveTo(x, y);
}

socket.on('draw', ({ x, y, color, size }) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.stroke();
});

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('clearCanvas');
}

socket.on('clearCanvas', () => ctx.clearRect(0, 0, canvas.width, canvas.height));