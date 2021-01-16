let getStartedPageContent = document.getElementById('getStartedPageContent');

let browserDropdownContentDiv = document.getElementById('browserDropdownContent');
let selectedBrowserIcon = document.getElementById('selectedBrowserIcon');
let browserName = document.getElementById('browserName');

//let browsers = ['Chrome', 'Firefox', 'Edge', 'Opera', 'Safari'];
let browsers = ['Chrome', 'Firefox', 'Edge', 'Opera'];
let noChromeBrowsers = ['Firefox', 'Edge', 'Opera'];
let userSelectedBrowser = localStorage.getItem('epUserBrowser');
const iconPath1 = './images/';
const iconPath2 = '-icon.png';

// let allElt = [];
let allElt = document.getElementsByClassName('ABC');

// for (let i = 0; i < array.length; i++) {
//     allElt.push(allABC);    
// }

function checkBrowser() {
    const { userAgent } = navigator;
    var browser;

    for (let i = 0; i < browsers.length; i++) {
        if (userAgent.includes(browsers[i])) {
            browser = browsers[i];
        }
    }

    if (userSelectedBrowser != (null || undefined)) {
        if (userSelectedBrowser != 'Chrome') {
            for (let i = 0; i < allElt.length; i++) {
                if (allElt[i].id === 'noChrome_pagecontent') {
                    allElt[i].style.display = 'block';
                    browser = userSelectedBrowser;
                }
            }
        }
    }

    selectedBrowserIcon.setAttribute('src', iconPath1 + browser + iconPath2);
    browserName.innerHTML = browser;

    return browser;
}

window.addEventListener('DOMContentLoaded', function (event) {
    if (safariCheck() === false) {
        checkBrowser();
        content(checkBrowser());
    }
});

function content(theBrowser) {
    for (let i = 0; i < allElt.length; i++) {
        if (allElt[i].id === 'browser_t') {
            //document.getElementById(allElt[i].id).innerHTML = theBrowser;
            allElt[i].innerHTML = theBrowser;
            allElt[i].style.display = 'inline-block';
            console.log(allElt[i]);
        }
    }
    
    for (let i = 0; i < allElt.length; i++) {
        var eltIdSplit = allElt[i].id.split('_');
        if (eltIdSplit[0] === theBrowser && eltIdSplit[1] === 'pagecontent') {
            allElt[i].style.display = 'inline-block';
        } else {
            if (allElt[i].id !== 'browser_t') {
                allElt[i].style.display = 'none';
            }
        }
    }

    if (theBrowser != 'Chrome') {
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
                content(browser);
            }
        }
    }

    if (clickedClass === 'browserDropdownContentBtn') {
        browser = event.target.parentNode.id.split('_')[1];
        
        for (let i = 0; i < browsers.length; i++) {
            if (browser === browsers[i]) {
                selectedBrowserIcon.setAttribute('src', iconPath1 + browser + iconPath2);
                browserName.innerHTML = browser;
                content(browser);
            }
        }
    }
    
    if (browser != undefined) {
        localStorage.setItem('epUserBrowser', browser);
    }

    if (clickedClass != 'browserDropdown' && clickedClass != 'browserDropdownContainer') {
        browserDropdownContentDiv.style.display = 'none';
    }
};