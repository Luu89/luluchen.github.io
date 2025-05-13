// This file contains JavaScript code to display "Hallo" on the webpage.
//document.addEventListener('DOMContentLoaded', function() {
//    const message = document.createElement('h1');
//    message.textContent = 'Hallo';
//    document.body.appendChild(message);
//});


// 添加事件监听器，实现点击单词卡片时翻转
document.querySelector('.word-card').addEventListener('click', function () {
    this.querySelector('.card-inner').classList.toggle('flipped');
});

