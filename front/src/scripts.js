// scripts.js
document.addEventListener('DOMContentLoaded', function () {
    function checkScreenSize() {
        const messageElement = document.getElementById('small-screen-message');
        if (window.innerWidth <= 600) {
            messageElement.style.display = 'block';
        } else {
            messageElement.style.display = 'none';
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize(); // ページロード時にもチェック
});
