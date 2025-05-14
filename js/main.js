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

    const speakableElements = document.querySelectorAll('.speakable');

    // 打印支持的语音列表
    speechSynthesis.onvoiceschanged = function () {
        const voices = speechSynthesis.getVoices();
        console.log('可用语音列表：', voices);
    };

    // 为每个单词添加点击事件
    speakableElements.forEach(element => {
        element.addEventListener('click', function () {
            const text = this.textContent; // 获取单词文本
            const lang = this.getAttribute('data-lang'); // 获取语言代码

            // 创建语音对象
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang; // 设置语言

            // 设置特定语音（如果可用）
            const voices = speechSynthesis.getVoices();
            const voice = voices.find(v => v.lang === lang);
            if (voice) {
                utterance.voice = voice;
            }

            speechSynthesis.speak(utterance); // 播放发音
        });
    });

    const languageButtons = document.querySelectorAll('.toggle-language');
    const wordColumns = document.querySelectorAll('.word-column');

    // 默认所有语言列显示（无需隐藏）
    // wordColumns.forEach(column => column.classList.add('hidden')); // 删除这行代码

    // 为每个按钮添加点击事件
    languageButtons.forEach(button => {
        button.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            this.classList.toggle('selected');

            // 切换对应语言列的显示状态
            const wordColumns = document.querySelectorAll(`.word-column[data-lang="${lang}"]`);
            wordColumns.forEach(column => column.classList.toggle('hidden'));
        });
    });

    // 绑定“听”按钮事件
    document.querySelectorAll('.play-audio').forEach(button => {
        button.addEventListener('click', function () {
            const text = this.getAttribute('data-text'); // 获取单词文本
            const lang = this.getAttribute('data-lang'); // 获取语言代码

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;

            // 检查语音列表是否加载完成
            const voices = speechSynthesis.getVoices();
            const voice = voices.find(v => v.lang === lang);
            if (voice) {
                utterance.voice = voice;
            }

            speechSynthesis.speak(utterance); // 播放发音
        });
    });

    // 绑定“说”按钮事件
    const startSpeakingButton = document.getElementById('start-speaking');
    const spokenText = document.getElementById('spoken-text');

    if (startSpeakingButton) {
        startSpeakingButton.addEventListener('click', function () {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'de-DE'; // 设置为德语
            recognition.start();

            recognition.onresult = function (event) {
                const result = event.results[0][0].transcript; // 获取用户说的内容
                spokenText.textContent = `您说的是: ${result}`;
            };

            recognition.onerror = function () {
                spokenText.textContent = '语音识别失败，请重试。';
            };
        });
    }

    // 绑定“读”按钮事件
    document.querySelectorAll('.show-translation').forEach(button => {
        button.addEventListener('click', function () {
            const translation = this.nextElementSibling; // 获取翻译元素
            translation.style.display = translation.style.display === 'none' ? 'block' : 'none';
        });
    });

    // 绑定“写”按钮事件
    const checkWritingButton = document.getElementById('check-writing');
    const writeInput = document.getElementById('write-input');
    const writeFeedback = document.getElementById('write-feedback');

    if (checkWritingButton) {
        checkWritingButton.addEventListener('click', function () {
            const correctWord = 'Hallo'; // 正确的单词
            const userInput = writeInput.value.trim();

            if (userInput.toLowerCase() === correctWord.toLowerCase()) {
                writeFeedback.textContent = '正确！';
                writeFeedback.style.color = 'green';
            } else {
                writeFeedback.textContent = `错误，正确答案是: ${correctWord}`;
                writeFeedback.style.color = 'red';
            }
        });
    }
});