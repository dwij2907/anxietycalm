let instructions = document.getElementById('instruction');
let circle = document.querySelector('.circle');
let startButton = document.getElementById('startButton');
let checkInDiv = document.getElementById('check-in');
let breathCount = 0;
let maxBreaths = 4; // Number of breathing cycles

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    const savedTime = parseFloat(localStorage.getItem('musicTime')) || 0;
    audio.currentTime = savedTime;

    // Attempt to play the music
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Music started playing
                console.log('Audio is playing');
            })
            .catch((error) => {
                // Playback was prevented
                console.log('Playback was prevented due to autoplay policy');
                // Optionally, provide a play button or prompt
            });
    }

    // Save the current time before leaving the page
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('musicTime', audio.currentTime);
    });
});

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
