document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('calming-video');
    const videoContainer = document.getElementById('video-container');
    const checkIn = document.getElementById('check-in');

    // Event listener for when the video ends
    video.addEventListener('ended', function() {
        // Hide the video container
        videoContainer.classList.add('hidden');
        // Show the check-in question
        checkIn.classList.remove('hidden');
    });
});

function handleResponse(response) {
    if (response === 'yes') {
        window.location.href = 'index.html';
    } else if (response === 'no') {
        window.location.href = 'puzzle.html';
    }
}
