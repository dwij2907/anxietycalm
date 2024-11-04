let instructions = document.getElementById('instruction');
let circle = document.querySelector('.circle');
let startButton = document.getElementById('startButton');
let checkInDiv = document.getElementById('check-in');
let breathCount = 0;
let maxBreaths = 4; // Number of breathing cycles

function startBreathing() {
    startButton.style.display = 'none';
    instructions.textContent = 'Breathe In...';
    circle.style.animation = 'breatheIn 4s forwards';
    circle.style.animationTimingFunction = 'ease-in-out';

    setTimeout(() => {
        instructions.textContent = 'Hold...';
        circle.style.animation = ''; // Stop the animation
        circle.style.transform = 'scale(1.5)'; // Keep the circle at expanded size

        setTimeout(() => {
            instructions.textContent = 'Breathe Out...';
            circle.style.animation = 'breatheOut 4s forwards';
            circle.style.animationTimingFunction = 'ease-in-out';

            setTimeout(() => {
                breathCount++;
                if (breathCount < maxBreaths) {
                    resetCircle();
                    startBreathing(); // Repeat the cycle
                } else {
                    endExercise();
                }
            }, 4000); // Wait for breathe out
        }, 2000); // Hold after breathe in
    }, 4000); // Wait for breathe in
}

function resetCircle() {
    circle.style.transform = 'scale(1)'; // Reset circle size
}

function endExercise() {
    instructions.textContent = 'Exercise complete. Are you feeling better?';
    checkInDiv.classList.remove('hidden');
}

function handleCheckIn(response) {
    if (response === 'yes') {
        window.location.href = 'index.html';
    } else if (response === 'no') {
        window.location.href = 'affirmations.html';
    }
}
