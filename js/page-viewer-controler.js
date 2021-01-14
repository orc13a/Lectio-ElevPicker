let mainPageContent = document.getElementById('mainPageContent');
let helpPageContent = document.getElementById('helpPageContent');
let getStartedPageContent = document.getElementById('getStartedPageContent');

let allPageContentId = [mainPageContent, helpPageContent, getStartedPageContent];

window.addEventListener('DOMContentLoaded', function (event) {
    var page = window.location.href.split('#')[1];
    var returnId = { id: page };
    navbtn(returnId);
});

function navbtn(elt) {
    for (let i = 0; i < allPageContentId.length; i++) {
        if (allPageContentId[i].id === elt.id.split('-')[0]) {
            allPageContentId[i].style.display = 'block';
        } else {
            allPageContentId[i].style.display = 'none';
        }
    }
}