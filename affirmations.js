document.addEventListener('DOMContentLoaded', function() {
    let affirmationCount = 0;

    function displayAffirmation() {
        const affirmations = [
            "I am capable and strong.",
            "I believe in myself and my abilities.",
            "Every day is a new opportunity.",
            "I am in control of my thoughts and emotions.",
            "I embrace peace and positivity.",
            "I am worthy of happiness and love.",
            "I face challenges with courage.",
            "I am growing and learning every day.",
            "My potential is limitless.",
            "I choose to be grateful and optimistic.",
            "I am calm and in control",
            "I feel the fear and let it go",
            "I let my anxious thoughts flow in one ear and out the other",
            "I am getting through this anxious moments, just as I have done a million times before",
            "I am strong and resilient",
            "I choose to feel calm and peaceful",
            "I’ve survived this before, I’ll survive now",
            "I am free from my anxiety. I am in control",
            "I’m in charge of my breathing, and I can slow it down",
            "I can do this",
            "I am above stress of any kind",
            "I am familiar with these feelings and they do not scare me",
            "I am surrounded by people who understand",
            "I am supported, loved and cared for",
            "I have the techniques and tools needed to persevere",
            "I am safe and in control.",
            "I have done this before, and I can do it again.",
            "This too shall pass.",
            "I am strong.",
            "I trust myself.",
            "I am capable.",
            "I take things one day at a time.",
            "I inhale peace and exhale worry.",
            "This feeling is only temporary.",
            "I am loved and accepted.",
            "I can move past this moment.",
            "I am in charge.",
            "As I breathe, I am calm and relaxed.",
            "My body is my ally."
        ];

        const randomIndex = Math.floor(Math.random() * affirmations.length);
        const affirmationText = affirmations[randomIndex];

        document.getElementById('affirmation-text').textContent = affirmationText;

        affirmationCount++;
        if (affirmationCount % 3 === 0) {
            showCheckIn();
        }
    }

    function showCheckIn() {
        document.getElementById('check-in').classList.remove('hidden');
    }

    // Hide the check-in prompt when user responds
    document.querySelectorAll('#check-in button').forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('check-in').classList.add('hidden');
        });
    });

    displayAffirmation();

    document.getElementById('new-affirmation-button').addEventListener('click', function() {
        displayAffirmation();
    });
});

function handleResponse(response) {
    if (response === 'yes') {
        window.location.href = 'index.html';
    } else if (response === 'no') {
        window.location.href = 'visualization.html';
    }
}
