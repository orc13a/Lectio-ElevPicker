let navBar = document.getElementsByTagName('nav');
let buttonsContainer = navBar[0].children[0];
let logoutBtn = buttonsContainer.children[1].children[0];
let navBtn;
let hintSpan;
let hintSpanInfo;
let infoWrapper;
let whatIsThisLink;
let hintOkBtn;

let date = new Date();
let thisMonth = date.getMonth();

let lastHintOk;
let hintShowCheck = false;

// chrome.storage.sync.clear(function () {
//     console.log('Cleared!!!');
// });

chrome.storage.sync.get(['elevpicker_last_hint_ok'], function(result) {
    if (result.elevpicker_last_hint_ok != thisMonth) {
        hintShowCheckSet();
    }
});

function hintShowCheckSet() {
    hintShowCheck = true;
}

if (logoutBtn.innerHTML != 'Log ind') {
    var buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'button elevpickerLectioNavBtn');
    buttonContainer.setAttribute('id', 'ex_elevpickerLectioNavBtn');
    buttonsContainer.appendChild(buttonContainer);

    var buttonLink = document.createElement('a');
    // buttonLink.setAttribute('href', '');
    buttonLink.setAttribute('data-role', 'button');
    buttonLink.setAttribute('tabindex', '0');
    buttonLink.setAttribute('class', 'ex_has-tooltip');
    buttonLink.setAttribute('id', 'ex_has-tooltip');
    buttonLink.innerHTML = 'ElevPicker';
    buttonContainer.appendChild(buttonLink);

    var wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'ex_tooltip-wrapper');
    wrapper.setAttribute('id', 'ex_tooltip-wrapper');
    buttonLink.appendChild(wrapper);

    var text = document.createElement('span');
    text.setAttribute('class', 'ex_tooltip');
    text.setAttribute('id', 'ex_tooltip');
    text.innerHTML = 'ElevPicker er hvor du kan<br>trække tilfældige elever eller<br>lave arbejds grupper<br>ud fra en klasse i Lectio.<br><br>Lectio ElevPicker extension';
    wrapper.appendChild(text);

    var hintWrapper = document.createElement('span');
    hintWrapper.setAttribute('id', 'ex_tooltip-wrapper_hint');
    buttonLink.appendChild(hintWrapper);

    var reminder = document.createElement('span');
    reminder.setAttribute('id', 'ex_tooltip_hint'); // <svg id="ex_ok_svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path id="ex_ok_path" d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>
    reminder.innerHTML = '<span id="ex_tooltip_hintText">Husk du har mig</span><br><button id="ex_hint_info_btn">Hvad er dette?</button><br><button id="ex_hint_ok">Forstået</button>';
    hintWrapper.appendChild(reminder);

    
    navBtn = document.getElementById('ex_has-tooltip');
    hintSpan = document.getElementById('ex_tooltip-wrapper_hint');
    hintSpanInfo = document.getElementById('ex_tooltip');
    whatIsThisLink  = document.getElementById('ex_hint_info_btn');
    hintOkBtn = document.getElementById('ex_hint_ok');
    infoWrapper = document.getElementById('ex_tooltip-wrapper');

    givHint();
}

function givHint() {
    chrome.storage.sync.get(['elevpicker_last_hint_ok'], function(result) {
        lastHintOk = result.elevpicker_last_hint_ok;
        if (lastHintOk != thisMonth || lastHintOk === undefined) {
            hintSpan.style.visibility = 'visible';
            hintShowCheckSet();
        }
    });
}

window.addEventListener('mouseover', function (event) {
    if(event.target.id === 'ex_ok_path' || event.target.id === 'ex_ok_svg' || event.target.id === 'ex_tooltip_hintText' || event.target.id === 'ex_tooltip_hint' || event.target.id === 'ex_hint_info_btn' || event.target.id === 'ex_hint_ok') {
        if (hintShowCheck === true) {
            hintSpanInfo.style.visibility = 'hidden';
        }
    }

    if (event.target.id === 'ex_tooltip-wrapper_hint' || event.target.id === 'ex_tooltip-wrapper') {
        if (hintShowCheck === true) {
            hintSpan.style.visibility = 'hidden';
        }
    }

    if (event.target.id === 'ex_has-tooltip') {
        if (hintShowCheck === true) {
            hintSpan.style.visibility = 'hidden';
        }
    }
});

window.addEventListener('mouseout', function (event) {
    if(event.target.id === 'ex_ok_path' || event.target.id === 'ex_ok_svg' || event.target.id === 'ex_tooltip_hintText' || event.target.id === 'ex_tooltip_hint' || event.target.id === 'ex_hint_info_btn' || event.target.id === 'ex_hint_ok') {
        if (hintShowCheck === true) {
            hintSpanInfo.style.visibility = null;
        }
    }

    if (event.target.id === 'ex_tooltip-wrapper_hint' || event.target.id === 'ex_tooltip-wrapper') {
        if (hintShowCheck === true) {
            hintSpan.style.visibility = 'visible';
        }
    }
    
    if (event.target.id === 'ex_has-tooltip') {
        if (hintShowCheck === true) {
            hintSpan.style.visibility = 'visible';
        }
    }
});

window.addEventListener('click', function(event) {
    if (event.target.id === 'ex_hint_info_btn') {
        window.open('https://orc13a.github.io/Lectio-ElevPicker/', '_blank');
    }

    if (event.target.id === 'ex_hint_ok') {
        confirmHint();
    }

    if (event.target.id === 'ex_has-tooltip' && event.target.id != 'ex_ok_path' || event.target.id != 'ex_ok_svg' || event.target.id != 'ex_tooltip_hintText' || event.target.id != 'ex_tooltip_hint' || event.target.id != 'ex_hint_info_btn' || event.target.id != 'ex_hint_ok') {
        goToElevPicker();
    }
});

function confirmHint() {
    chrome.storage.sync.set({'elevpicker_last_hint_ok': thisMonth});
}

function goToElevPicker() {
    var url = window.location.href;
    var urlSplit = url.split('/');
    var schoolId = urlSplit[4];
    
    window.open('https://www.lectio.dk/lectio/' + schoolId + '/FindSkema.aspx?type=stamklasse', '_self');
}