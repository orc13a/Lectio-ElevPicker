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