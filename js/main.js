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
            toggleLanguage(this);
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

    // 搜索词典功能
    document.getElementById('search-button').addEventListener('click', searchWord);

    function searchWord() {
        const input = document.getElementById('dictionary-input').value.trim();
        const resultDiv = document.getElementById('dictionary-result');

        if (!input) {
            resultDiv.textContent = 'Please enter a word to search.';
            return;
        }

        const dictionary = {
            Brautpaar: 'Bride and groom',
            Outfit: 'Clothing or attire',
            Braut: 'Bride',
            Bräutigam: 'Groom',
            Anzug: 'Suit',
            Hochzeitsmesse: 'Wedding fair',
            Eheringe: 'Wedding rings',
            Juwelier: 'Jeweler'
        };

        const result = dictionary[input];
        resultDiv.textContent = result ? `${input}: ${result}` : 'Word not found in the dictionary.';
    }

    function selectAllLanguages() {
        const buttons = document.querySelectorAll('.toggle-language');
        const words = document.querySelectorAll('.word-column');

        // 将所有按钮设置为选中状态
        buttons.forEach(button => {
            if (!button.classList.contains('selected')) {
                button.classList.add('selected');
            }
        });

        // 显示所有单词
        words.forEach(word => {
            word.classList.remove('hidden');
        });
    }

    function deselectAllLanguages() {
        const buttons = document.querySelectorAll('.toggle-language');
        const words = document.querySelectorAll('.word-column');

        // 将所有按钮设置为未选中状态
        buttons.forEach(button => {
            if (button.classList.contains('selected')) {
                button.classList.remove('selected');
            }
        });

        // 隐藏所有单词
        words.forEach(word => {
            word.classList.add('hidden');
        });
    }

    function toggleLanguage(button) {
        const lang = button.getAttribute('data-lang');
        const words = document.querySelectorAll(`.word-column[data-lang="${lang}"]`);

        // 切换按钮的选中状态
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
            words.forEach(word => word.classList.add('hidden')); // 隐藏对应语言的单词
        } else {
            button.classList.add('selected');
            words.forEach(word => word.classList.remove('hidden')); // 显示对应语言的单词
        }
    }

        if (Array.isArray(content)) {
        const ul = document.createElement('ul');
        content.forEach(item => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `word.html?word=${encodeURIComponent(item)}`; // 跳转到 word.html 并传递单词参数
            link.textContent = item;
            li.appendChild(link);
            ul.appendChild(li);
        });
        sectionDiv.appendChild(ul);
    } else {
        const p = document.createElement('p');
        p.innerHTML = content;
        sectionDiv.appendChild(p);
    }

    fetch('definitions.json')
    .then(response => response.json())
    .then(wordDefinitions => {
        const urlParams = new URLSearchParams(window.location.search);
        const word = urlParams.get('word');

        const wordTitle = document.getElementById('word-title');
        const wordDefinition = document.getElementById('word-definition');

        if (word && wordDefinitions[word]) {
            wordTitle.textContent = word;
            wordDefinition.textContent = wordDefinitions[word];
        } else {
            wordTitle.textContent = "单词未找到";
            wordDefinition.textContent = "抱歉，我们没有找到该单词的解释。";
        }
    })
    .catch(error => {
        console.error('Error loading definitions:', error);
    });

    // 引用 messageBoard.js 文件
    const script = document.createElement('script');
    script.src = 'js/messageBoard.js'; // 确保路径正确
    document.head.appendChild(script);

    // 留言板功能
    const commentsDiv = document.getElementById('comments');
    const commentInput = document.getElementById('comment-input');

    // 加载评论
    async function loadComments() {
        const response = await fetch('/api/comments');
        const comments = await response.json();
        commentsDiv.innerHTML = '';
        comments.forEach(comment => {
            const p = document.createElement('p');
            p.textContent = comment;
            commentsDiv.appendChild(p);
        });
    }

    // 添加评论
    async function addComment() {
        const comment = commentInput.value.trim();
        if (comment) {
            await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment })
            });
            commentInput.value = '';
            loadComments();
        }
    }

    // 初始化加载评论
    loadComments();

    document.querySelectorAll('.speak-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const speakText = this.getAttribute('data-speak');
            const lang = this.getAttribute('data-lang') || 'de-DE';
            const synth = window.speechSynthesis;
            let utter = new SpeechSynthesisUtterance(speakText);
            utter.lang = lang;
            // 优先选择德语/丹麦语 voice
            const voices = synth.getVoices();
            let voice = voices.find(v => v.lang === lang);
            if (voice) utter.voice = voice;
            synth.speak(utter);
        });
    });
});