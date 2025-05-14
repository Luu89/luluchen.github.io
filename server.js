////Users/yu/Documents/GitHub/luluchen.github.io/
//├── index.html
//├── videoThema.html
//├── js/
//│   ├── main.js
//│   ├── videoUpload.js
//├── server.js
//├── uploads/                <-- 上传的视频文件将存储在此文件夹中
//├── css/
//│   ├── style.css

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// 配置 multer，用于处理文件上传
const upload = multer({
    dest: 'uploads/', // 存储到项目根目录下的 uploads 文件夹
});

// 静态文件服务（可选）
app.use(express.static(path.join(__dirname, 'public')));


// 上传接口
app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: '未上传文件！' });
    }

    console.log('文件已上传:', req.file);

    // 返回上传成功的响应
    res.json({
        message: '视频上传成功！',
        file: req.file,
    });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`服务器已启动，监听端口 ${PORT}`);
});