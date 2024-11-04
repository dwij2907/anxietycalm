document.getElementById('yes-button').addEventListener('click', function() {
    window.location.href = 'index.html';  // Redirect to the homepage if the user feels better
});

document.getElementById('no-button').addEventListener('click', function() {
    alert("Please take a rest or try another relaxation exercise."); // Provide a message or alternative action if the user does not feel better
});
