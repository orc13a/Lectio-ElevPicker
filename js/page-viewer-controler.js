// let mainPageContent = document.getElementById('mainPageContent');
// let helpPageContent = document.getElementById('helpPageContent');
let getStartedPageContent = document.getElementById('getStartedPageContent');

// let allPageContentId = [mainPageContent, helpPageContent, getStartedPageContent];

// Firefox 1.0+
// let isFirefox = typeof InstallTrigger !== 'undefined';
// console.log(navigator.userAgent);
// // Chrome 1 - 79
// let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

let browserDropdownContentDiv = document.getElementById('browserDropdownContent');
let selectedBrowserIcon = document.getElementById('selectedBrowserIcon');
let browserName = document.getElementById('browserName');
// let browserFirefox = document.getElementById('userBrowserFirefox');
let browsers = ['Chrome', 'Firefox', 'Edge', 'Opera', 'Safari'];
let userSelectedBrowser = localStorage.getItem('epUserBrowser');
const iconPath1 = './images/';
const iconPath2 = '-icon.png';

let allElt = [];
let theBrowsersContent = document.getElementsByClassName('ABC');

for (let i = 0; i < theBrowsersContent.length; i++) {
    allElt.push(theBrowsersContent[i]);
}

window.addEventListener('DOMContentLoaded', function (event) {
    //checkBrowser();
    //var page = window.location.href.split('=')[1];
    //var returnId = { id: page };
    //navbtn(returnId);
    //checkBrowser();
});

// function navbtn(elt) {
//     var param = elt.id.split('-')[0];
//     console.log(elt.id);
//     for (let i = 0; i < allPageContentId.length; i++) {
//         if (allPageContentId[i].id === param && param !== undefined) {
//             console.log(allPageContentId[i].id);
//             allPageContentId[i].style.display = 'block';
//         } else {
//             allPageContentId[i].style.display = 'none';
//         }
//     }
// }

function checkBrowser() {
    const { userAgent } = navigator;

    if (safariCheck() === false) {
        if (userSelectedBrowser != null || userSelectedBrowser != undefined) {
            selectedBrowserIcon.setAttribute('src', iconPath1 + userSelectedBrowser + iconPath2);
            browserName.innerHTML = userSelectedBrowser;
            showContent(userSelectedBrowser);
        } else if (userAgent.includes('Firefox/')) {
            selectedBrowserIcon.setAttribute('src', iconPath1 + 'Firefox' + iconPath2);
            browserName.innerHTML = 'Firefox';
            showContent('Firefox');
        } else if (userAgent.includes('Edg/')) {
            selectedBrowserIcon.setAttribute('src', iconPath1 + 'Edge' + iconPath2);
            browserName.innerHTML = 'Edge';
            showContent('Edge');
        } else if (userAgent.includes('Chrome/')) {
            selectedBrowserIcon.setAttribute('src', iconPath1 + 'Chrome' + iconPath2);
            browserName.innerHTML = 'Chrome';
            showContent('Chrome');
        } else if (userAgent.includes('OPR/')) {
            selectedBrowserIcon.setAttribute('src', iconPath1 + 'Opera' + iconPath2);
            browserName.innerHTML = 'Opera';
            showContent('Opera');
        }
    } else {
        getStartedPageContent.style.display = 'none';
    }

    if (userSelectedBrowser != null || userSelectedBrowser != undefined) {
        if (userSelectedBrowser != 'Chrome') {
            //document.getElementById('noChrome_pagecontent').style.display = 'block';
            for (let i = 0; i < allElt.length; i++) {
                if (allElt[i].id === 'noChrome_pagecontent') {
                    allElt[i].style.display = 'block';
                }
            }
        }
    } else {
        if (userAgent.includes('Firefox') === true || userAgent.includes('Edge') === true || userAgent.includes('Opera') === true) {
            for (let i = 0; i < allElt.length; i++) {
                if (allElt[i].id === 'noChrome_pagecontent') {
                    allElt[i].style.display = 'block';
                }
            }
        }
    }
}
checkBrowser();

function showContent(theBrowser) {
    for (let i = 0; i < allElt.length; i++) {
        if (allElt[i].id === 'browser_t') {
            //document.getElementById(allElt[i].id).innerHTML = theBrowser;
            allElt[i].innerHTML = theBrowser;
        }
    }

    for (let i = 0; i < browsers.length; i++) {
        if (browsers[i] != 'Safari') {
            // allElt[i].split('_')[i]
            if (allElt[i].id.split('_')[0] == theBrowser && allElt[i].id.split('_')[1] === 'pagecontent') {
                allElt[i].style.display = 'inline-block';
            } else {
                //document.getElementById(browsers[i] + '_pagecontent').style.display = 'none';
                if (allElt[i].id.split('_')[1] === 'pagecontent') {
                    allElt[i].style.display = 'none';
                }
            }
        }
    }

    if (theBrowser != 'Chrome' && theBrowser != 'Safari') {
        for (let i = 0; i < allElt.length; i++) {
            if (allElt[i].id === 'noChrome_pagecontent') {
                allElt[i].style.display = 'block';
            }
        }
    }
}

function selectBrowser() {
    browserDropdownContentDiv.style.display = 'block';
}

window.onclick = function (event) {
    var clickedClass = event.target.parentNode.className;
    var browser;

    if (clickedClass === 'browserDropdownContent') {
        browser = event.target.id.split('_')[1];
        
        for (let i = 0; i < browsers.length; i++) {
            if (browser === browsers[i]) {
                selectedBrowserIcon.setAttribute('src', iconPath1 + browser + iconPath2);
                browserName.innerHTML = browser;
                showContent(browser);
            }
        }
    }

    if (clickedClass === 'browserDropdownContentBtn') {
        browser = event.target.parentNode.id.split('_')[1];
        
        for (let i = 0; i < browsers.length; i++) {
            if (browser === browsers[i]) {
                selectedBrowserIcon.setAttribute('src', iconPath1 + browser + iconPath2);
                browserName.innerHTML = browser;
                showContent(browser);
            }
        }
    }
    
    if (browser != undefined) {
        localStorage.setItem('epUserBrowser', browser);
    }
    
    if (clickedClass != 'browserDropdown' && clickedClass != 'browserDropdownContainer') {
        browserDropdownContentDiv.style.display = 'none';
    }
}