// This file contains JavaScript code to display "Hallo" on the webpage.
//document.addEventListener('DOMContentLoaded', function() {
//    const message = document.createElement('h1');
//    message.textContent = 'Hallo';
//    document.body.appendChild(message);
//});

// 确保 DOM 加载完成后再添加事件监听器
document.addEventListener('DOMContentLoaded', function () {
    // 为单词卡片添加点击事件监听器
    const wordCard = document.querySelector('.word-card');
    if (wordCard) {
        wordCard.addEventListener('click', function () {
            this.querySelector('.card-inner').classList.toggle('flipped');
        });
    }
});

