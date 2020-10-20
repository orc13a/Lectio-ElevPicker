var tables = document.getElementsByTagName("table");

var buttonTable = tables[0].rows[0];
var buttonTableChildren = buttonTable.children[0];
//console.log(buttonTableChildren);

// -----------------------
// UI elements
// -----------------------

// Container
var pageBtnContainer = document.createElement('div');
pageBtnContainer.setAttribute('style', 'display:none;')
pageBtnContainer.setAttribute('id', 'ex_elevPicker_container');
buttonTableChildren.appendChild(pageBtnContainer);

// Div for the random button
var randomBtnDiv = document.createElement('div');
randomBtnDiv.setAttribute('id', 'ex_elevPicker_randomBtnDiv');
pageBtnContainer.appendChild(randomBtnDiv);

// The random button
var randomBtn = document.createElement('div');
randomBtn.innerHTML = 'Vælg tilfældig elev';
randomBtn.setAttribute('id', 'ex_elevPicker_getBtn');
randomBtnDiv.appendChild(randomBtn);
// var randomBtn = document.createElement('button');
// randomBtn.innerHTML = 'Find tilfældig elev';
// randomBtn.setAttribute('id', 'ex_elevPicker_getBtn');
// randomBtnDiv.appendChild(randomBtn);

// Div for the settings button
var settingBtnDiv = document.createElement('div');
settingBtnDiv.setAttribute('id', 'ex_elevPicker_settingsBtnDiv');
pageBtnContainer.appendChild(settingBtnDiv);

// The reset button
var resetBtn = document.createElement('div');
resetBtn.innerHTML = 'Vis alle igen';
resetBtn.setAttribute('style', 'display:none;');
resetBtn.setAttribute('id', 'ex_elevPicker_resetBtn');
settingBtnDiv.appendChild(resetBtn);

// Input for to show reset button
var resetBtnInputCheck = document.createElement('input');
resetBtnInputCheck.setAttribute('value', '');
resetBtnInputCheck.setAttribute('id', 'ex_elevPicker_resetBtnInput');
resetBtnInputCheck.setAttribute('style', 'display:none;');
settingBtnDiv.appendChild(resetBtnInputCheck);

// The settings button
var settingsBtn = document.createElement('div');
settingsBtn.innerHTML = 'Indstillinger';
settingsBtn.setAttribute('id', 'ex_elevPicker_settingsBtn');
settingBtnDiv.appendChild(settingsBtn);
// var settingsBtn = document.createElement('button');
// settingsBtn.innerHTML = 'Indstillinger';
// settingsBtn.setAttribute('id', 'ex_elevPicker_settingsBtn');
// settingsBtn.setAttribute('onclick', 'ex_settingsBtn()');
// settingBtnDiv.appendChild(settingsBtn);

// Extension nave div with text
var exText = document.createElement('div');
exText.innerHTML = 'Lectio ElevPicker';
exText.setAttribute('id', 'ex_elevPicker_pageTitle');
pageBtnContainer.appendChild(exText);

// Settings div
var settingDiv = document.createElement('div');
settingDiv.setAttribute('id', 'ex_elevPicker_settingsDiv');
settingDiv.setAttribute('style', 'display: none;');
pageBtnContainer.appendChild(settingDiv);

// Not to pick numbers input div
var noPickNumbersInputDiv = document.createElement('div');
noPickNumbersInputDiv.setAttribute('id', 'ex_elevPicker_noPickNumbersInputDiv');
settingDiv.appendChild(noPickNumbersInputDiv);

// Input for number not to pick at random
var noPickNumbersInput = document.createElement('input');
noPickNumbersInput.setAttribute('id', 'ex_elevPicker_noPickNumbersInput');
noPickNumbersInput.setAttribute('placeholder', '8,10,20,24,...');
noPickNumbersInput.setAttribute('value', '');
noPickNumbersInputDiv.appendChild(noPickNumbersInput);

// Div for text after input
var noPickNumbersInputText = document.createElement('div');
noPickNumbersInputText.innerHTML = '<u>Tal som ikke skal trækkes</u>';
noPickNumbersInputText.setAttribute('id', 'ex_elevPicker_noPickNumbersInputText');
noPickNumbersInputDiv.appendChild(noPickNumbersInputText);

// Div for ekstra info for no numbers input
var noPickNumbersInputEkstraText = document.createElement('div');
noPickNumbersInputEkstraText.innerHTML = 'Talene skal <b><u>ikke</u></b> skrives som 08 men 8 og adskildes med komma, fx. (8,11,20).<br>Det er Lectio ElevPicker nummeret man skal skrive.';
noPickNumbersInputEkstraText.setAttribute('id', 'ex_elevPicker_noPickNumbersInputEkstraText');
noPickNumbersInputDiv.appendChild(noPickNumbersInputEkstraText);

// UPS in settings
var exInfo = document.createElement('div');
exInfo.innerHTML = 'Lectio ElevPicker vælger en elev ud fra deres plads i tabellen og ikke deres elev nummer.';
exInfo.setAttribute('id', 'ex_elevPicker_exInfo');
settingDiv.appendChild(exInfo);

// ----------------------------
// Check toggel
// ----------------------------

var elevPickerContainer = document.getElementById('ex_elevPicker_container');

function showElevPicker() {
    chrome.storage.sync.get("showElevPickerSwitchStorage", function (result) {
        if(result.showElevPickerSwitchStorage === true) {
        
            elevPickerContainer.style.display = 'block'; 
            // console.log(' - Lectio opgaver vindue plugin - \n\n> Opgaver som er afleveret skjult: ' + amountOfDeletesArr.length + '.\n\n'+'Nyd det dejlige overblik!');
        }
    });
}

function hideElevPicker() {
    chrome.storage.sync.get("showElevPickerSwitchStorage", function (result) {
        if(result.showElevPickerSwitchStorage === false) {

            elevPickerContainer.style.display = 'none';
        
            // console.log(' - Lectio opgaver vindue plugin - \n\n> Opgaver som er afleveret vist: ' + amountOfDeletesArr.length + '.');
        }
    });
}


chrome.storage.sync.get("showElevPickerSwitchStorage", function (result) {
    if (result.showElevPickerSwitchStorage === undefined) {
        chrome.storage.sync.set({"showElevPickerSwitchStorage": true});
        showElevPicker();
    } else if (result.showElevPickerSwitchStorage === true) {
        showElevPicker();
    } else if (result.showElevPickerSwitchStorage === false) {
        hideElevPicker();
    } else {
        alert(' - Lectio ElevPicker - \n\n Der er sket en fejl og sætter "vis ElevPicker" til deaktiveret.\n\n #1-1');
    } 
});


chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        
        if(storageChange.newValue === true) {
            showElevPicker();
        } else if (storageChange.newValue === false) {
            hideElevPicker();
        } else {
            alert(' - Lectio ElevPicker - \n\n Der er sket en fejl og sætter "vis ElevPicker" til deaktiveret.\n\n #1-2');
        }
    }
});

// ----------------------------
// Settings Btn and container 
// ----------------------------
var settingsBtnListener = document.getElementById('ex_elevPicker_settingsBtn');

var settingsContainerListener = document.getElementById('ex_elevPicker_settingsDiv');

settingsBtnListener.addEventListener('click', function () {
    if (settingsBtnListener.innerHTML === 'Indstillinger') {
        settingsContainerListener.style.display = 'block';
        settingsBtnListener.innerHTML = 'Luk indstillinger';
    } else if (settingsBtnListener.innerHTML === 'Luk indstillinger') {
        settingsContainerListener.style.display = 'none';
        settingsBtnListener.innerHTML = 'Indstillinger';
    } else {
         alert('- Lectio ElevPicker -\n\nIndstillinger fejl\n\n#1');
     }
});


// ----------------------------
// Random picker function
// ----------------------------

var eleverArr = [];

var elevTable = tables[1].rows;
for (trElt of elevTable) {
    eleverArr.push(trElt);
}

var headerTh = document.createElement('th');
headerTh.setAttribute('scope', 'col');
headerTh.innerHTML = 'ElevPicker nummer';
eleverArr[0].appendChild(headerTh);


for (let i = 1; i < eleverArr.length; i++) {
    var td = document.createElement('td');
    td.innerHTML = i;
    td.setAttribute('id', 'ex_elevPicker_studentNr');
    eleverArr[i].appendChild(td);
}


var randomBtnListener = document.getElementById('ex_elevPicker_getBtn');

function getRandomNr(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function showWinner(exStudentId) {
    var resetBtn2 = document.getElementById('ex_elevPicker_resetBtn');
    resetBtn2.style.display = 'inline-block';

    for (let i = 0; i < eleverArr.length; i++) {
        eleverArr[i].style.display = 'none';
        if (i === exStudentId) {
            eleverArr[i].style.display = '';
        }  
    }
}


randomBtnListener.addEventListener('click', function () {
    randomBtnListener.innerHTML = 'Vælg tilfældig elev igen';

    var max = eleverArr.length - 1;
    var min = 1;
    var randomNr = getRandomNr(min, max);
    
    var settingInputNoPickNumber = document.getElementById('ex_elevPicker_noPickNumbersInput').value;
    if (settingInputNoPickNumber != '') {

        var settingInputNoPickNumberArr = settingInputNoPickNumber.split(',');
        
        // var xcx = document.getElementById('s_m_HeaderContent_MainTitle').innerHTML;
        // if (xcx === 'Klassen L 2i Kerm/It - Elever' || xcx === 'Klassen L 3i Kerm/It - Elever') {
        //     settingInputNoPickNumberArr.push('23');
        // }
        //console.log(settingInputNoPickNumberArr);
        if (settingInputNoPickNumberArr.includes(randomNr.toString()) === true) {
            for (let x = 0; x < settingInputNoPickNumberArr.length; x++) {
                var newRandom = getRandomNr(min,max);
                if (settingInputNoPickNumberArr.includes(newRandom.toString()) === false) {
                    break;
                }
            }
            // console.log('ran:' +randomNr);
            // console.log('new:' + newRandom);
            showWinner(newRandom);
        } else {
            showWinner(randomNr);
        }

    } else {

        // xcxArr = [];

        // var xcx = document.getElementById('s_m_HeaderContent_MainTitle').innerHTML;
        // if (xcx === 'Klassen L 2i Kerm/It - Elever' || xcx === 'Klassen L 3i Kerm/It - Elever') {
        //     xcxArr.push('23');
        // }

        // if (xcxArr.includes(randomNr.toString()) === true) {
        //     for (let x = 0; x < xcxArr.length; x++) {
        //         var newRandom2 = getRandomNr(min,max);
        //         if (newRandom2.toString() !== xcxArr[x]) {
        //             break;
        //         }
        //     }
        //     showWinner(newRandom2);
        // } else {
            showWinner(randomNr);
        //}

    }
});

// ----------------------------
// Show random reset
// ----------------------------

var resetBtnX = document.getElementById('ex_elevPicker_resetBtn');

resetBtnX.addEventListener('click', function () {
    randomBtnListener.innerHTML = 'Vælg tilfældig elev';
    for (let i = 0; i < eleverArr.length; i++) {
        eleverArr[i].style.display = '';
    }
    resetBtnX.style.display = 'none';
});