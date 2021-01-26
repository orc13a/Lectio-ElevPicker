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
}

let sessionPicked = [];

randomBtnListener.addEventListener('click', function () {
    var resetBtn2 = document.getElementById('ex_elevPicker_resetBtn');
    randomBtnListener.innerHTML = 'Vælg tilfældig elev igen';

    if (resetBtn2.classList.contains('dis') === true || randomBtnListener.innerHTML === 'Vælg tilfældig elev igen') {

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

            if (sessionPicked.length > 0) {
               if (settingInputNoPickNumberArr.length != 0) {
                   while (sessionPicked.includes(randomNr) == true || settingInputNoPickNumberArr.includes(randomNr) == true) {
                        randomNr = getRandomNr(min, max);
                        if (sessionPicked.includes(randomNr) == false && settingInputNoPickNumberArr.includes(randomNr) == false) {
                            break;
                        }
                   }
               }
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
    //resetBtnX.style.display = 'none';
    resetBtnX.classList.add('dis');
});