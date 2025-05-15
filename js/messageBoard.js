// 初始化留言板
document.addEventListener('DOMContentLoaded', function () {
    const messageForm = document.getElementById('message-form');
    const messageList = document.getElementById('message-list');

    // 从 localStorage 加载留言
    const messages = JSON.parse(localStorage.getItem('messages')) || [];

    // 渲染留言列表
    function renderMessages() {
        messageList.innerHTML = '';
        messages.forEach((msg, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${msg.username}</strong>
                <p>${msg.message}</p>
                <button onclick="deleteMessage(${index})">删除</button>
            `;
            messageList.appendChild(li);
        });
    }

    // 提交留言
    messageForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const message = document.getElementById('message').value.trim();

        if (username && message) {
            messages.push({ username, message });
            localStorage.setItem('messages', JSON.stringify(messages));
            renderMessages();
            messageForm.reset();
        }
    });

    // 删除留言
    window.deleteMessage = function (index) {
        messages.splice(index, 1);
        localStorage.setItem('messages', JSON.stringify(messages));
        renderMessages();
    };

    // 初始化渲染
    renderMessages();
});