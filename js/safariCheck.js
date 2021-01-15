function safariCheck() {
    const { userAgent } = navigator;
    var isSafari = false;
    
    if (userAgent.includes('Safari/') && !userAgent.includes('Chrome/') && !userAgent.includes('Firefox/')) {
        isSafari = true;
        document.getElementById('browserIsSafariAlert').style.display = 'block';
    }

    return isSafari;
}

window.addEventListener('DOMContentLoaded', function (event) {
    safariCheck();
});