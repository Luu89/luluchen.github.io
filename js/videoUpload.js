document.addEventListener('DOMContentLoaded', function () {
    const videoInput = document.getElementById('video-input');
    const uploadedVideo = document.getElementById('uploaded-video');

    // 监听文件上传事件
    videoInput.addEventListener('change', function (event) {
        const file = event.target.files[0]; // 获取上传的文件

        if (file) {
            // 检查文件类型是否为视频
            if (!file.type.startsWith('video/')) {
                alert('请选择一个视频文件！');
                return;
            }

            // 创建视频的临时 URL
            const fileURL = URL.createObjectURL(file);
            uploadedVideo.src = fileURL; // 设置视频源
            uploadedVideo.style.display = 'block'; // 显示视频播放器
        }
    });
});