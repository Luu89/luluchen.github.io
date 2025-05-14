document.addEventListener('DOMContentLoaded', function () {
    const videoInput = document.getElementById('video-input');

    videoInput.addEventListener('change', function (event) {
        const file = event.target.files[0]; // 获取上传的文件

        if (file) {
            const formData = new FormData();
            formData.append('video', file);

            // 将视频文件上传到服务器
            fetch('/upload', { // '/upload' 是服务器的上传接口
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log('视频上传成功:', data);
                alert('视频上传成功！');
            })
            .catch(error => {
                console.error('视频上传失败:', error);
                alert('视频上传失败，请重试！');
            });
        }
    });
});