// Step-by-step prompts for the 5-4-3-2-1 grounding technique
const steps = [
    { prompt: "List 5 things you can see around you", count: 5 },
    { prompt: "List 4 things you can touch", count: 4 },
    { prompt: "List 3 things you can hear", count: 3 },
    { prompt: "List 2 things you can smell", count: 2 },
    { prompt: "List 1 thing you can taste", count: 1 }
];

let currentStep = 0;

document.addEventListener("DOMContentLoaded", () => {
    showStep(currentStep);
});

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

// Function to display the current step
function showStep(stepIndex) {
    const exerciseDiv = document.getElementById("exercise");
    exerciseDiv.innerHTML = ""; // Clear previous content

    const step = steps[stepIndex];
    const promptText = document.createElement("p");
    promptText.textContent = step.prompt;
    exerciseDiv.appendChild(promptText);

    for (let i = 0; i < step.count; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Enter item ${i + 1}`;
        input.classList.add("response-input");
        input.addEventListener("input", checkAllFilled); // Add input event listener to check inputs
        exerciseDiv.appendChild(input);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.onclick = handleNextStep;
    nextButton.id = "nextButton";
    exerciseDiv.appendChild(nextButton);
}

// Function to check if all input fields are filled
function checkAllFilled() {
    const inputs = document.querySelectorAll(".response-input");
    const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");

    if (allFilled) {
        // Disable the next button to prevent double progression
        document.getElementById("nextButton").disabled = true;
        proceedToNextStep();
    } else {
        // Enable the next button if not all fields are filled
        document.getElementById("nextButton").disabled = false;
    }
}

// Function to handle the Next button click
function handleNextStep() {
    proceedToNextStep();
}

// Function to proceed to the next step
function proceedToNextStep() {
    currentStep++;
    if (currentStep < steps.length) {
        showStep(currentStep);
    } else {
        displayCheckIn();
    }
}

// Function to display the final check-in question
function displayCheckIn() {
    document.getElementById("exercise").classList.add("hidden");
    document.getElementById("check-in").classList.remove("hidden");
}

// Function to handle the check-in response
function handleCheckIn(response) {
    if (response === 'yes') {
        window.location.href = 'index.html';
    } else if (response === 'no') {
        window.location.href = 'breathing.html';
    }
}
