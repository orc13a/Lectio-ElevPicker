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
headerTh.setAttribute('id', 'ex_elevPicker_Th');
eleverArr[0].appendChild(headerTh);


for (let i = 1; i < eleverArr.length; i++) {
    var td = document.createElement('td');
    td.innerHTML = i;
    td.setAttribute('id', 'ex_elevPicker_studentNr');
    td.setAttribute('style', 'text-align: center;');
    eleverArr[i].appendChild(td);
}

var randomBtnListener = document.getElementById('ex_elevPicker_getBtn');

function getRandomNr(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let storageLoadDone = false;

function storageLoad() {
    storageLoadDone = true;
}

let className = document.getElementById('s_m_HeaderContent_MainTitle').innerHTML.split(' ').join('');

if (className.includes('/') === true) {
    className = className.split('/').join('');
}

if(className.includes('-') === true) {
    className = className.split('-').join('');
}

if(className.includes('.') === true) {
    className = className.split('.').join('');
}

// chrome.storage.sync.set({[className]: []});

chrome.storage.sync.get([className], function(result) {
    var settingInputNoPickNumberInput = document.getElementById('ex_elevPicker_noPickNumbersInput');
    var settingAlertIcon = document.getElementById('ex_elevpicker_student_picked_info_settingBtn');
    var resetInfoText = document.getElementById('ex_elevPicker_resetPickedStudentsDivInfoText');
    var resetBtn = document.getElementById('ex_elevPicker_resetPickedStudentsDiv');

    if (result[className] === undefined) {
        chrome.storage.sync.set({[className]: []}); 
    } else {
        var ids = result[className];

        if (ids.length != eleverArr.length && ids.length < eleverArr.length && ids.length > 0) {
            var elevPickerIds = [];
            for (let i = 0; i < ids.length; i++) {
                elevPickerIds.push(Number(ids[i]) + 1);
            }
            var idsReady = elevPickerIds.join(',');
            settingInputNoPickNumberInput.value = idsReady;
            settingInputNoPickNumberInput.setAttribute('size', idsReady.length);

            settingAlertIcon.style.visibility = 'visible';
            resetInfoText.style.display = 'block';
            resetBtn.style.display = 'block';
        } else {
            chrome.storage.sync.set({[className]: []});
        }
    }

    storageLoad();
});

function resetClassHistoryStudentsPicked() {
    var settingInputNoPickNumberInput = document.getElementById('ex_elevPicker_noPickNumbersInput');
    var settingAlertIcon = document.getElementById('ex_elevpicker_student_picked_info_settingBtn');
    var resetInfoText = document.getElementById('ex_elevPicker_resetPickedStudentsDivInfoText');
    var resetBtn = document.getElementById('ex_elevPicker_resetPickedStudentsDiv');

    chrome.storage.sync.set({[className]: []});
    settingAlertIcon.style.visibility = 'hidden';
    settingInputNoPickNumberInput.value = null;
    settingInputNoPickNumberInput.setAttribute('size', '4');
    resetInfoText.style.display = 'none';
    resetBtn.style.display = 'none';
}

let sessionPicked = [];

function showWinner(exStudentId) {
    var resetBtn2 = document.getElementById('ex_elevPicker_resetBtn');
    //resetBtn2.style.display = 'inline-block';
    resetBtn2.classList.remove('dis');

    for (let i = 0; i < eleverArr.length; i++) {
        eleverArr[i].style.display = 'none';
        if (i === exStudentId) {
            eleverArr[i].style.display = '';
        }  
    }

    chrome.storage.sync.get([className], function(result) {
        var arr = result[className];
        arr.push(exStudentId);
        chrome.storage.sync.set({[className]: arr});

        if (arr.length == eleverArr.length) {
            var settingInputNoPickNumberInput = document.getElementById('ex_elevPicker_noPickNumbersInput');
            var settingAlertIcon = document.getElementById('ex_elevpicker_student_picked_info_settingBtn');
            var resetInfoText = document.getElementById('ex_elevPicker_resetPickedStudentsDivInfoText');
            var resetBtn = document.getElementById('ex_elevPicker_resetPickedStudentsDiv');

            settingInputNoPickNumberInput.value = '';
            settingInputNoPickNumberInput.setAttribute('size', '4');

            settingAlertIcon.style.visibility = 'hidden';
            resetInfoText.style.display = 'none';
            resetBtn.style.display = 'none';

            chrome.storage.sync.set({[className]: []});
        }
    });
}

function randomStudent() {
    var resetBtn2 = document.getElementById('ex_elevPicker_resetBtn');
    randomBtnListener.innerHTML = 'Vælg tilfældig elev igen';

    if (storageLoadDone == true && resetBtn2.classList.contains('dis') === true || randomBtnListener.innerHTML === 'Vælg tilfældig elev igen' && eleverArr.length > 1) {
        
        var max = eleverArr.length - 1;
        var min = 0;
        var randomNr;

        var settingInputNoPickNumber = document.getElementById('ex_elevPicker_noPickNumbersInput').value;

        if (settingInputNoPickNumber != '') {
            
            var settingInputNoPickNumberArr = settingInputNoPickNumber.split(',');

            for (let i = 0; i < settingInputNoPickNumberArr.length; i++) {
                settingInputNoPickNumberArr[i] = Number(settingInputNoPickNumberArr[i] - 1);
            }
            
            randomNr = getRandomNr(min, max);

            if (sessionPicked.length == (max - settingInputNoPickNumberArr.length)) {
                sessionPicked = [];
            }

            if (sessionPicked.length > 0 || settingInputNoPickNumberArr.length > 0) {
            //    if (settingInputNoPickNumberArr.length != 0) {
                   while (sessionPicked.includes(randomNr) == true || settingInputNoPickNumberArr.includes(randomNr) == true) {
                        randomNr = getRandomNr(min, max);
                        if (sessionPicked.includes(randomNr) == false && settingInputNoPickNumberArr.includes(randomNr) == false) {
                            break;
                        }
                   }
            //    }
            }

            showWinner(randomNr);
            sessionPicked.push(randomNr);

        } else {
            randomNr = getRandomNr(min, max);

            if (sessionPicked.length == max) {
                sessionPicked = [];
            }

            if (sessionPicked.length > 0 && sessionPicked.length != max) {
                while (sessionPicked.includes(randomNr) === true) {
                    randomNr = getRandomNr(min, max);
                    if (sessionPicked.includes(randomNr) === false) {
                        break;
                    }
                }
            }

            showWinner(randomNr);
            sessionPicked.push(randomNr);
        }
    }
}

randomBtnListener.addEventListener('click', function () {
    randomStudent();
});

// ----------------------------
// Show random reset.
// ----------------------------

var resetBtnX = document.getElementById('ex_elevPicker_resetBtn');

resetBtnX.addEventListener('click', function () {
    randomBtnListener.innerHTML = 'Vælg tilfældig elev';
    for (let i = 0; i < eleverArr.length; i++) {
        eleverArr[i].style.display = '';
    }
    //resetBtnX.style.display = 'none';
    resetBtnX.classList.add('dis');
});