// ----------------------------
// Settings Btn and container 
// ----------------------------
var settingsBtnListener = document.getElementById('ex_elevPicker_settingsBtn');
let settingsAlertIconSpan = document.getElementById('ex_elevpicker_student_picked_info_settingBtn'); 
var settingsContainerListener = document.getElementById('ex_elevPicker_settingsDiv');

settingsBtnListener.addEventListener('click', function () {
    if (settingsBtnListener.children[0].innerHTML === 'Indstillinger') {
        settingsContainerListener.style.display = 'block';
        settingsBtnListener.children[0].innerHTML = 'Luk indstillinger';
        settingsAlertIconSpan.style.left = '32px';
    } else if (settingsBtnListener.children[0].innerHTML === 'Luk indstillinger') {
        settingsContainerListener.style.display = 'none';
        settingsBtnListener.children[0].innerHTML = 'Indstillinger';
        settingsAlertIconSpan.style.left = '48px';
    } else {
         alert('- Lectio ElevPicker -\n\nIndstillinger fejl\n\n#1');
     }
});

// ----------------------------
// ElevPicker ID table header
// ----------------------------

let elevPickerIdSettingsText = document.getElementById('ex_elevPicker_noPickNumbersInputElevPickerSpanHover');
let elevPickerIdSettingsText2 = document.getElementById('ex_elevPicker_noPickNumbersInputElevPickerSpanHover2');
let elevPickerTH = document.getElementById('ex_elevPicker_Th');

elevPickerIdSettingsText.addEventListener('mouseover', function () {
    elevPickerTH.style.backgroundColor = '#C85B5B';
    elevPickerTH.style.color = 'white';
});

elevPickerIdSettingsText.addEventListener('mouseout', function () {
    elevPickerTH.style.backgroundColor = '';
    elevPickerTH.style.color = '';
});

elevPickerIdSettingsText2.addEventListener('mouseover', function () {
    elevPickerTH.style.backgroundColor = '#C85B5B';
    elevPickerTH.style.color = 'white';
});

elevPickerIdSettingsText2.addEventListener('mouseout', function () {
    elevPickerTH.style.backgroundColor = '';
    elevPickerTH.style.color = '';
});

let groupAmountInfoHelp = document.getElementById('ex_elevpicker_groupAmountInfo');
let groupsInfoHelp = document.getElementById('ex_elevpicker_groupsInfo');
let groupAmountInputHelp = document.getElementById('ex_elevPicker_groupAmountInput');
let groupsInputHelp = document.getElementById('ex_elevPicker_groupsInput');

groupAmountInfoHelp.addEventListener('mouseover', function () {
    groupAmountInputHelp.style.borderColor = '#C85B5B';
});

groupAmountInfoHelp.addEventListener('mouseout', function () {
    groupAmountInputHelp.style.borderColor = '';
});

groupsInfoHelp.addEventListener('mouseover', function () {
    groupsInputHelp.style.borderColor = '#C85B5B';
});

groupsInfoHelp.addEventListener('mouseout', function () {
    groupsInputHelp.style.borderColor = '';
});





let noPickNumbersRandomInput = document.getElementById('ex_elevPicker_noPickNumbersInput');

noPickNumbersRandomInput.addEventListener('input', function() {
    if (noPickNumbersRandomInput.value.length > 4) {
        noPickNumbersRandomInput.setAttribute('size', noPickNumbersRandomInput.value.length);
    } else {
        noPickNumbersRandomInput.setAttribute('size', "4");
    }
});


// ----------------------------
// Grupper buttons
// ----------------------------

var navGroupBtn = document.getElementById('ex_elevPicker_groupBtn');
var groupCancel = document.getElementById('ex_elevPicker_cancelGroupBtn');
var createGroupsBtn = document.getElementById('ex_elevPicker_createGroupBtn');
var groupContentDiv = document.getElementById('ex_elevPicker_groupDiv');

navGroupBtn.addEventListener('click', function() {
    if (groupContentDiv.style.display === 'none') {
        groupContentDiv.style.display = 'block';
    } else {
        groupContentDiv.style.display = 'none';
    }
});

groupCancel.addEventListener('click', function() {
    if (groupContentDiv.style.display === 'block') {
        groupContentDiv.style.display = 'none';
    }
});

var historyResetBtn = document.getElementById('ex_elevPicker_resetBtnHistoryStudentPulled');

historyResetBtn.addEventListener('click', function() {
    resetClassHistoryStudentsPicked(); // random.js
});