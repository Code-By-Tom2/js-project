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
    ctx.moveTo(getX(event), getY(event));
    socket.emit('startDraw', { x: getX(event), y: getY(event) });
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
    socket.emit('stopDraw');
}

function draw(event) {
    if (!drawing) return;
    ctx.lineTo(getX(event), getY(event));
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(getX(event), getY(event));
    socket.emit('draw', { x: getX(event), y: getY(event), color, size });
}

socket.on('draw', ({ x, y, color, size }) => {
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
});

socket.on('startDraw', ({ x, y }) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
});

socket.on('stopDraw', () => {
    ctx.beginPath();
});

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit('clearCanvas');
}

socket.on('clearCanvas', () => ctx.clearRect(0, 0, canvas.width, canvas.height));

function getX(event) {
    return event.clientX - canvas.getBoundingClientRect().left;
}

function getY(event) {
    return event.clientY - canvas.getBoundingClientRect().top;
}