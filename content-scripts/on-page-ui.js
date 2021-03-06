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

// Extension nave div with text
var exText = document.createElement('div');
exText.innerHTML = 'Lectio ElevPicker';
exText.setAttribute('id', 'ex_elevPicker_pageTitle');
pageBtnContainer.appendChild(exText);

// Div for the random button
var randomBtnDiv = document.createElement('div');
randomBtnDiv.setAttribute('id', 'ex_elevPicker_randomBtnDiv');
pageBtnContainer.appendChild(randomBtnDiv);

// The random button
var randomBtn = document.createElement('div');
randomBtn.innerHTML = 'Vælg tilfældig elev';
randomBtn.setAttribute('id', 'ex_elevPicker_getBtn');
randomBtnDiv.appendChild(randomBtn);

// The group button
var groupBtn = document.createElement('div');
groupBtn.innerHTML = 'Lav grupper';
groupBtn.setAttribute('id', 'ex_elevPicker_groupBtn');
randomBtnDiv.appendChild(groupBtn);

// Div for settings and reset
var secondRowBtnsDiv = document.createElement('div');
secondRowBtnsDiv.setAttribute('id', 'ex_elevPicker_secondRowBtns');
pageBtnContainer.appendChild(secondRowBtnsDiv);

// The reset button
var resetBtn = document.createElement('div');
resetBtn.innerHTML = 'Vis alle igen';
resetBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/></svg>';
resetBtn.setAttribute('style', 'display:inline-block;');
resetBtn.setAttribute('title', 'Vis alle elever igen (nulstil)');
resetBtn.setAttribute('class', 'dis');
resetBtn.setAttribute('id', 'ex_elevPicker_resetBtn');
secondRowBtnsDiv.appendChild(resetBtn);

// The settings button
var settingsBtn = document.createElement('div');
settingsBtn.innerHTML = '<span id="ex_elevpicker_settings_btn_text">Indstillinger</span><span style="visibility: hidden;" title="Der er nogen ændringer i indstillninger" id="ex_elevpicker_student_picked_info_settingBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg></span>';
settingsBtn.setAttribute('id', 'ex_elevPicker_settingsBtn');
secondRowBtnsDiv.appendChild(settingsBtn);

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
noPickNumbersInput.setAttribute('placeholder', '8,10');
noPickNumbersInput.setAttribute('value', '');
noPickNumbersInput.setAttribute('size', '4');
noPickNumbersInputDiv.appendChild(noPickNumbersInput);

// Div for text after input
var noPickNumbersInputText = document.createElement('div');
noPickNumbersInputText.innerHTML = 'Elever som ikke skal trækkes <span id="ex_elevPicker_noPickNumbersInputElevPickerSpanHover">(ElevPicker nummer)</span><br><i>tallene skal deles med et komma</i> | <a target="_blank" href="https://orc13a.github.io/Lectio-ElevPicker/help.html#notPullStudent">Hjælp</a>';
noPickNumbersInputText.setAttribute('id', 'ex_elevPicker_noPickNumbersInputText');
noPickNumbersInputDiv.appendChild(noPickNumbersInputText);

// Reset history picked students Div
var resetHistoryStudentsInfoText = document.createElement('div');
resetHistoryStudentsInfoText.innerHTML = 'Dette er elever som er blevet trukket på et andet tidspunkt. Fra sidste gang der bliv trukket eller andet.<br>Du kan nulstilde og dermed gøre sådan at alle elever kan trækkes igen.';
resetHistoryStudentsInfoText.setAttribute('id', 'ex_elevPicker_resetPickedStudentsDivInfoText');
resetHistoryStudentsInfoText.setAttribute('style', 'display: none;');
noPickNumbersInputDiv.appendChild(resetHistoryStudentsInfoText);

// Reset history picked students Div
var resetHistoryStudents = document.createElement('div');
resetHistoryStudents.setAttribute('id', 'ex_elevPicker_resetPickedStudentsDiv');
resetHistoryStudents.setAttribute('style', 'display: none;');
resetHistoryStudentsInfoText.appendChild(resetHistoryStudents);

// The reset button
var resetBtnHistoryStudent = document.createElement('div');
resetBtnHistoryStudent.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/></svg>&nbsp&nbsp<span>Nulstil alle allerede trykket elever</span>';
resetBtnHistoryStudent.setAttribute('style', 'display:inline-block;');
resetBtnHistoryStudent.setAttribute('title', 'Nulstil alle valgte elever');
// resetBtn.setAttribute('class', 'dis');
resetBtnHistoryStudent.setAttribute('id', 'ex_elevPicker_resetBtnHistoryStudentPulled');
resetHistoryStudents.appendChild(resetBtnHistoryStudent);

// Make group div
var groupDiv = document.createElement('div');
groupDiv.setAttribute('id', 'ex_elevPicker_groupDiv');
groupDiv.setAttribute('style', 'display: none;');
pageBtnContainer.appendChild(groupDiv);

// Make group div info text div
var groupInfoDiv = document.createElement('div');
groupInfoDiv.innerHTML = 'Du kan enten bruge "<span id="ex_elevpicker_groupAmountInfo">Antal grupper</span>" eller "<span id="ex_elevpicker_groupsInfo">Antal elever pr. gruppe</span>".<br>Bare udfyld en af dem og dermed vil du have mulighed for at lave grupper.<br>Eller så kan du få mere <a target="_blank" href="https://orc13a.github.io/Lectio-ElevPicker/help.html#groupInputs">hjælp her</a>.';
groupInfoDiv.setAttribute('id', 'ex_elevPicker_groupInfoDiv');
groupDiv.appendChild(groupInfoDiv);

// Group amount input div
var groupFileTitleInputDiv = document.createElement('div');
groupFileTitleInputDiv.setAttribute('id', 'ex_elevPicker_groupFileTitleInputDiv');
groupDiv.appendChild(groupFileTitleInputDiv);

// Input for Group amount
var groupFileTitleInput = document.createElement('input');
groupFileTitleInput.setAttribute('id', 'ex_elevPicker_groupFileTitleInput');
groupFileTitleInput.setAttribute('placeholder', 'Dansk grupper');
groupFileTitleInput.setAttribute('value', '');
groupFileTitleInput.setAttribute('size', '13');
groupFileTitleInputDiv.appendChild(groupFileTitleInput);

// Div for text after input
var groupFileTitleInputText = document.createElement('div');
groupFileTitleInputText.innerHTML = 'Hvad skal grupperne bruges til';
groupFileTitleInputText.setAttribute('id', 'ex_elevPicker_groupFileTitleInputText');
groupFileTitleInputDiv.appendChild(groupFileTitleInputText);

// Group amount input div
var groupAmountInputDiv = document.createElement('div');
groupAmountInputDiv.setAttribute('id', 'ex_elevPicker_groupAmountDiv');
groupDiv.appendChild(groupAmountInputDiv);

// Input for Group amount
var groupAmountInput = document.createElement('input');
groupAmountInput.setAttribute('id', 'ex_elevPicker_groupAmountInput');
groupAmountInput.setAttribute('placeholder', '6');
groupAmountInput.setAttribute('value', '');
groupAmountInput.setAttribute('size', '1');
groupAmountInputDiv.appendChild(groupAmountInput);

// Div for text after input
var groupAmountInputText = document.createElement('div');
groupAmountInputText.innerHTML = 'Antal grupper';
groupAmountInputText.setAttribute('id', 'ex_elevPicker_groupAmountInputText');
groupAmountInputDiv.appendChild(groupAmountInputText);

// Groups input div
var groupsInputDiv = document.createElement('div');
groupsInputDiv.setAttribute('id', 'ex_elevPicker_groupsDiv');
groupDiv.appendChild(groupsInputDiv);

// Input for Groups
var groupsInput = document.createElement('input');
groupsInput.setAttribute('id', 'ex_elevPicker_groupsInput');
groupsInput.setAttribute('placeholder', '3');
groupsInput.setAttribute('value', '');
groupsInput.setAttribute('size', '1');
groupsInputDiv.appendChild(groupsInput);

// Div for text after input
var groupsInputText = document.createElement('div');
groupsInputText.innerHTML = 'Antal elever pr. gruppe';
groupsInputText.setAttribute('id', 'ex_elevPicker_groupsInputText');
groupsInputDiv.appendChild(groupsInputText);

// Not to include group input div
var noIncludeGroupInputDiv = document.createElement('div');
noIncludeGroupInputDiv.setAttribute('id', 'ex_elevPicker_noIncludeGroupInputDiv');
groupDiv.appendChild(noIncludeGroupInputDiv);

// Input for not includeing to group
var noIncludeGroupInput = document.createElement('input');
noIncludeGroupInput.setAttribute('id', 'ex_elevPicker_noIncludeGroupInput');
noIncludeGroupInput.setAttribute('placeholder', '8,10');
noIncludeGroupInput.setAttribute('value', '');
noIncludeGroupInput.setAttribute('size', '4');
noIncludeGroupInput.setAttribute('title', 'tallene skal deles med et komma')
noIncludeGroupInputDiv.appendChild(noIncludeGroupInput);

// Div for text after input
var noIncludeGroupInputText = document.createElement('div');
noIncludeGroupInputText.innerHTML = 'Elever som ikke skal i nogen gruppe <span id="ex_elevPicker_noPickNumbersInputElevPickerSpanHover2">(ElevPicker nummer)</span><br><i>tallene skal deles med et komma</i> | <a target="_blank" href="https://orc13a.github.io/Lectio-ElevPicker/help.html#notPullStudent">Hjælp</a>';
noIncludeGroupInputText.setAttribute('id', 'ex_elevPicker_noPickNumbersInputText');
noIncludeGroupInputDiv.appendChild(noIncludeGroupInputText);

// Div for matrixgrupper
var matrixGroupDiv = document.createElement('div');
matrixGroupDiv.setAttribute('id', 'ex_elevPicker_matrixgrupperDiv');
groupDiv.appendChild(matrixGroupDiv);

var matrixGroupCheckbox = document.createElement('input');
matrixGroupCheckbox.setAttribute('id', 'ex_elevPicker_matrixGroupCheckbox');
matrixGroupCheckbox.setAttribute('type', 'checkbox');
matrixGroupDiv.appendChild(matrixGroupCheckbox);

var matrixGroupCheckboxLabel = document.createElement('label');
matrixGroupCheckboxLabel.setAttribute('id', 'ex_elevPicker_matrixGroupCheckboxLabel');
matrixGroupCheckboxLabel.setAttribute('for', 'ex_elevPicker_matrixGroupCheckbox');
matrixGroupCheckboxLabel.innerHTML = 'Lav matrix grupper | <a target="_blank" href="https://orc13a.github.io/Lectio-ElevPicker/help.html#matrixgroups">læs mere</a>';
matrixGroupDiv.appendChild(matrixGroupCheckboxLabel);

// Div for group cancel button
var cancelGroupBtnDiv = document.createElement('div');
cancelGroupBtnDiv.setAttribute('id', 'ex_elevPicker_cancelGroupBtnDiv');
groupDiv.appendChild(cancelGroupBtnDiv);

// The group cancel button
var cancelGroupBtn = document.createElement('div');
cancelGroupBtn.innerHTML = 'Annuller';
cancelGroupBtn.setAttribute('id', 'ex_elevPicker_cancelGroupBtn');
cancelGroupBtnDiv.appendChild(cancelGroupBtn);

// The group create button
var createGroupBtn = document.createElement('div');
createGroupBtn.innerHTML = 'Lav grupper';
createGroupBtn.setAttribute('class', 'dis');
createGroupBtn.setAttribute('title', 'Du skal udfulde en af felterne (Læs teksten øverst)');
createGroupBtn.setAttribute('id', 'ex_elevPicker_createGroupBtn');
cancelGroupBtnDiv.appendChild(createGroupBtn);

// Link to gitpage help
var exHelpLink = document.createElement('a');
exHelpLink.innerHTML = 'Hjælp til Lectio ElevPicker';
exHelpLink.setAttribute('href', 'https://orc13a.github.io/Lectio-ElevPicker/help.html');
exHelpLink.setAttribute('target', '_blank');
exHelpLink.setAttribute('id', 'ex_elevPicker_onpageHelpLink');

// Extension version text
var exVersionText = document.createElement('span');
exVersionText.innerHTML = '2.0.0 | '; // page version
exVersionText.setAttribute('id', 'ex_elevPicker_pageVersion');

var exVersionTextDiv = document.createElement('div');
exVersionTextDiv.setAttribute('id', 'ex_elevPicker_pageVersionDiv');
pageBtnContainer.appendChild(exVersionTextDiv);

exVersionTextDiv.appendChild(exVersionText);
exVersionTextDiv.appendChild(exHelpLink);

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
        
        if (key === 'showElevPickerSwitchStorage') {
            if(storageChange.newValue === true) {
                showElevPicker();
            } else if (storageChange.newValue === false) {
                hideElevPicker();
            } else {
                alert(' - Lectio ElevPicker - \n\n Der er sket en fejl og sætter "vis ElevPicker" til deaktiveret.\n\n #1-2');
            }
        }
    }
});