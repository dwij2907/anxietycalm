function nextStep() {
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
                // Save the current time before leaving the page
                localStorage.setItem('musicTime', audio.currentTime);
                // Navigate to the next page
                window.location.href = "grounding.html";
            })
            .catch((error) => {
                // Playback was prevented
                console.log('Playback was prevented due to autoplay policy');
                // Proceed to the next page anyway
                window.location.href = "grounding.html";
            });
    } else {
        // If playPromise is undefined, navigate to the next page
        window.location.href = "grounding.html";
    }
}

