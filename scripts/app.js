// This file contains JavaScript code to display "Hallo" on the webpage.
//document.addEventListener('DOMContentLoaded', function() {
//    const message = document.createElement('h1');
//    message.textContent = 'Hallo';
//    document.body.appendChild(message);
//});

// 示例：点击单词卡片翻转显示释义
document.querySelector('.word-card').addEventListener('click', function() {
    this.classList.toggle('flipped');
});

