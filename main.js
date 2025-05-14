document.addEventListener('DOMContentLoaded', function () {
    // 获取所有单词卡片
    const wordCards = document.querySelectorAll('.word-card');
    
    // 为每个单词卡片添加点击事件监听器
    wordCards.forEach(function (card) {
        card.addEventListener('click', function () {
            this.querySelector('.card-inner').classList.toggle('flipped');
        });
    });
});