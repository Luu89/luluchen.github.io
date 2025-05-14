document.addEventListener('DOMContentLoaded', function () {
    // 获取所有单词卡片
    const wordCards = document.querySelectorAll('.word-card');
    
    // 为每个单词卡片添加点击事件监听器
    wordCards.forEach(function (card) {
        card.addEventListener('click', function () {
            this.querySelector('.card-inner').classList.toggle('flipped');
        });
    });

    const searchInput = document.getElementById('search-input');
    const wordRows = document.querySelectorAll('.word-row');

    // 监听搜索框输入事件
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();

        // 遍历所有单词行
        wordRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            if (rowText.includes(query)) {
                row.style.display = ''; // 显示匹配的行
            } else {
                row.style.display = 'none'; // 隐藏不匹配的行
            }
        });
    });

    // 打印浏览器支持的语音列表
    const voices = speechSynthesis.getVoices();
    console.log(voices);

    // 获取所有可发音的单词元素
    const speakableElements = document.querySelectorAll('.speakable');

    // 为每个单词添加点击事件
    speakableElements.forEach(element => {
        element.addEventListener('click', function () {
            const text = this.textContent; // 获取单词文本
            const lang = this.getAttribute('data-lang'); // 获取语言代码

            // 使用 SpeechSynthesis API 发音
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang; // 设置语言

            // 设置特定的语音（如果可用）
            const voice = speechSynthesis.getVoices().find(v => v.lang === lang);
            if (voice) {
                utterance.voice = voice;
            }

            speechSynthesis.speak(utterance); // 播放发音
        });
    });

    const languageButtons = document.querySelectorAll('.toggle-language');
    const wordColumns = document.querySelectorAll('.word-column');

    // 初始化：隐藏所有语言列
    wordColumns.forEach(column => column.classList.add('hidden'));

    // 为每个按钮添加点击事件
    languageButtons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');

            // 切换按钮的选中状态
            this.classList.toggle('selected');

            // 切换对应语言列的显示状态
            wordColumns.forEach(column => {
                if (column.getAttribute('data-lang') === lang) {
                    column.classList.toggle('hidden');
                }
            });
        });
    });
});