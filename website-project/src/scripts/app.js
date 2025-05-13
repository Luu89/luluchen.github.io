// This file contains JavaScript code to display "Hallo" on the webpage.
document.addEventListener('DOMContentLoaded', function() {
    const message = document.createElement('h1');
    message.textContent = 'Hallo';
    document.body.appendChild(message);
});