function showAnswers() {
    const answers = window.readingAnswers || {};
    for (let i = 1; i <= 6; i++) {
        const radios = document.getElementsByName('q' + i);
        let userAnswer = "";
        for (const r of radios) {
            if (r.checked) userAnswer = r.value;
        }
        const mark = document.getElementById('mark-q' + i);
        if (mark) {
            if (!userAnswer) {
                mark.textContent = '未作答';
                mark.style.color = '#c00';
            } else if (userAnswer === answers['q' + i]) {
                mark.textContent = '✔';
                mark.style.color = '#008800';
            } else {
                mark.textContent = '✗';
                mark.style.color = '#c00';
            }
            mark.style.fontWeight = 'bold';
            mark.style.marginLeft = '10px';
        }
    }
}

// 题目解析按钮功能
function showExplanation(num) {
    // 高亮本题关键词
    document.querySelectorAll('.kw[data-q="' + num + '"]').forEach(e => e.classList.add('kw-active'));
    // 下划线原文句子
    var sent = document.querySelector('.sentence[data-q="' + num + '"]');
    if (sent) sent.classList.add('sentence-active');
    // 加粗本题关键词
    document.querySelectorAll('.bold[data-q="' + num + '"]').forEach(e => e.classList.add('bold-active'));
    // 第一题特殊红框
    document.querySelectorAll('.redbox[data-q="' + num + '"]').forEach(e => e.classList.add('redbox-active'));
    // 显示解析内容
    let exp = document.getElementById('explain-q' + num);
    if (exp) exp.style.display = "block";
    let btn = document.getElementById('explain-btn-q' + num);
    if (btn) btn.style.display = "none";
}

function hideExplanation(num) {
    // 只取消本题的高亮
    document.querySelectorAll('.kw[data-q="' + num + '"]').forEach(e => e.classList.remove('kw-active'));
    var sent = document.querySelector('.sentence[data-q="' + num + '"]');
    if (sent) sent.classList.remove('sentence-active');
    document.querySelectorAll('.bold[data-q="' + num + '"]').forEach(e => e.classList.remove('bold-active'));
    document.querySelectorAll('.redbox[data-q="' + num + '"]').forEach(e => e.classList.remove('redbox-active'));
    // 隐藏本题解析内容
    let exp = document.getElementById('explain-q' + num);
    if (exp) exp.style.display = "none";
    let btn = document.getElementById('explain-btn-q' + num);
    if (btn) btn.style.display = "inline-block";
}