document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');

    // Function to play music
    function playMusic() {
        const savedTime = parseFloat(localStorage.getItem('musicTime')) || 0;
        audio.currentTime = savedTime;
        audio.play();

        // Loop handling
        audio.addEventListener('ended', function() {
            audio.currentTime = 0;
            audio.play();
        });
    }

    // Play music when the page loads
    playMusic();

    // Save the current time before leaving the page
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('musicTime', audio.currentTime);
    });
});


function nextStep() {
    // Navigate to the next section or page
    window.location.href = "grounding.html";
}
