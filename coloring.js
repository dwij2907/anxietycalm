document.addEventListener('DOMContentLoaded', function() {
    setupColorPicker();
    setupCanvas();
    setupDoneButton();
});

let currentColor = '#000000'; // Default color is black
let isDrawing = false;
let canvas, ctx;

function setupColorPicker() {
    const colorPicker = document.getElementById('color-picker');
    const colors = ['#000000', '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3', '#FFFFFF'];
    colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-option';
        colorDiv.style.backgroundColor = color;
        colorDiv.addEventListener('click', function() {
            currentColor = color;
            // Highlight the selected color
            document.querySelectorAll('.color-option').forEach(el => el.style.borderColor = '#fff');
            colorDiv.style.borderColor = '#000';
        });
        colorPicker.appendChild(colorDiv);
    });
}

function setupCanvas() {
    canvas = document.getElementById('drawing-canvas');
    ctx = canvas.getContext('2d');

    // Set the canvas dimensions to fit its container
    resizeCanvas();

    // Redraw the canvas when the window is resized
    window.addEventListener('resize', resizeCanvas);

    // Set up event listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('touchstart', startDrawing, {passive: false});

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', draw, {passive: false});

    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);
}

function resizeCanvas() {
    // Get the container's width
    const containerWidth = document.getElementById('canvas-container').offsetWidth;
    canvas.width = containerWidth;
    canvas.height = containerWidth * 0.75; // Adjusted height ratio remains the same
    // If you want to clear the canvas on resize, uncomment the following line
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    ctx.beginPath();
    const pos = getMousePos(e);
    ctx.moveTo(pos.x, pos.y);
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    const pos = getMousePos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function stopDrawing(e) {
    if (!isDrawing) return;
    e.preventDefault();
    isDrawing = false;
    ctx.closePath();
}

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    return { x, y };
}

function setupDoneButton() {
    const doneButton = document.getElementById('done-button');
    doneButton.addEventListener('click', function() {
        document.getElementById('check-in').classList.remove('hidden');
    });
}

function handleResponse(response) {
    if (response === 'yes') {
        window.location.href = 'index.html';
    } else if (response === 'no') {
        window.location.href = 'pmr.html';
    }
}
