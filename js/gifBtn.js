function gifHelp(btn, gifId) {
    var gifElt = document.getElementById(gifId);

    if (gifElt.style.display === 'none') {
        gifElt.style.display = 'block';
        btn.innerHTML = 'Luk video';
    } else {
        gifElt.style.display = 'none';
        btn.innerHTML = 'Se video';
    }
}