// 示例：通用API调用函数
function callMyAPI(params, callback) {
    fetch('https://api.example.com/yourapi?' + new URLSearchParams(params))
        .then(res => res.json())
        .then(data => callback(data))
        .catch(err => console.error('API error:', err));
}

// 你可以根据需要添加更多API函数