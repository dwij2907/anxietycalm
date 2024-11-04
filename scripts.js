document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-music');
    const playButton = document.querySelector('.next-button'); // Assuming the user will click this to start

    function playMusic() {
        const savedTime = parseFloat(localStorage.getItem('musicTime')) || 0;
        audio.currentTime = savedTime;

        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Automatic playback started
                console.log('Playback started');
            }).catch(error => {
                // Auto-play was prevented
                console.log('Playback prevented');
                // Here, you can show some UI to the user to manually start playback
            });
        }
    }

    // Binding playMusic to a user-initiated event
    playButton.addEventListener('click', function() {
        playMusic();
    });

    // Save the current time before leaving the page
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('musicTime', audio.currentTime);
    });
});


function nextStep() {
    // Navigate to the next section or page
    window.location.href = "grounding.html";
}
