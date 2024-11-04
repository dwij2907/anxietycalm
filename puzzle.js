document.addEventListener('DOMContentLoaded', function() {
    createPuzzle('puzzle-image.jpg'); // Ensure this image is 400x400 pixels or will be scaled accordingly
});

let container;
let totalPieces;
let piecesPlaced = 0;

function createPuzzle(imageSrc) {
    container = document.getElementById('puzzle-container');
    container.innerHTML = ''; // Clear previous content
    const rows = 3;
    const cols = 3;
    const pieceWidth = 400 / cols;  // Now 133.33px
    const pieceHeight = 400 / rows; // Now 133.33px
    totalPieces = rows * cols;

    let pieces = [];

    // Create slots
    for (let i = 0; i < rows * cols; i++) {
        let slot = document.createElement('div');
        slot.className = 'puzzle-slot';
        container.appendChild(slot);
    }

    // Create puzzle pieces
    for (let i = 0; i < totalPieces; i++) {
        let piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.style.backgroundImage = `url('${imageSrc}')`;
        
        // Calculate background position
        let row = Math.floor(i / cols);
        let col = i % cols;
        piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;

        piece.dataset.correctSlot = i;

        // Randomly position pieces outside the container
        piece.style.left = `${Math.random() * (window.innerWidth - pieceWidth)}px`;
        piece.style.top = `${Math.random() * (window.innerHeight - pieceHeight)}px`;
        piece.style.position = 'absolute';
        document.body.appendChild(piece); // Place pieces outside the container
        pieces.push(piece);
        initDrag(piece);
    }
}

function initDrag(piece) {
    // Bind the event handlers to the piece
    piece.onMouseDownHandler = onMouseDown.bind(null, piece);
    piece.addEventListener('mousedown', piece.onMouseDownHandler);
}

function onMouseDown(piece, event) {
    event.preventDefault();

    if (piece.placed) {
        return; // Do nothing if the piece is already placed
    }

    let shiftX = event.clientX - piece.getBoundingClientRect().left;
    let shiftY = event.clientY - piece.getBoundingClientRect().top;

    piece.style.zIndex = 1000; // Bring the piece to the front

    // Bind the event handlers
    piece.onMouseMoveHandler = onMouseMove.bind(null, piece, shiftX, shiftY);
    piece.onMouseUpHandler = onMouseUp.bind(null, piece);

    document.addEventListener('mousemove', piece.onMouseMoveHandler);
    document.addEventListener('mouseup', piece.onMouseUpHandler);

    piece.ondragstart = function() {
        return false;
    };
}

function onMouseMove(piece, shiftX, shiftY, event) {
    piece.style.left = event.pageX - shiftX + 'px';
    piece.style.top = event.pageY - shiftY + 'px';
}

function onMouseUp(piece, event) {
    document.removeEventListener('mousemove', piece.onMouseMoveHandler);
    document.removeEventListener('mouseup', piece.onMouseUpHandler);

    piece.style.zIndex = ''; // Reset z-index

    checkPiecePlacement(piece, event.pageX, event.pageY);
}

function checkPiecePlacement(piece, x, y) {
    const slots = document.querySelectorAll('.puzzle-slot');
    let placed = false;

    slots.forEach((slot, index) => {
        const slotRect = slot.getBoundingClientRect();
        if (
            x >= slotRect.left &&
            x <= slotRect.right &&
            y >= slotRect.top &&
            y <= slotRect.bottom
        ) {
            // Check if this is the correct slot
            const correctSlotIndex = parseInt(piece.dataset.correctSlot);

            if (correctSlotIndex === index) {
                // Snap piece into slot
                piece.style.position = 'relative';
                piece.style.left = '0px';
                piece.style.top = '0px';
                piece.removeEventListener('mousedown', piece.onMouseDownHandler); // Remove event listener
                piece.placed = true; // Mark the piece as placed
                piece.parentNode.removeChild(piece); // Remove from body
                slot.appendChild(piece); // Add to slot
                piecesPlaced++;

                if (piecesPlaced === totalPieces) {
                    showCompletionMessage();
                }
                placed = true;
            }
        }
    });

    if (!placed) {
        // If not placed in a slot, piece remains where it was dropped
    }
}

function showCompletionMessage() {
    document.getElementById('completion-message').classList.remove('hidden');
}

function handleResponse(response) {
    if (response === 'yes') {
        window.location.href = 'index.html';
    } else if (response === 'no') {
        window.location.href = 'math_quiz.html';
    }
}
