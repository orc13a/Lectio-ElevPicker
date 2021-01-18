let cancelBtn = document.getElementById('ex_elevPicker_cancelGroupBtn');
let createBtn = document.getElementById('ex_elevPicker_createGroupBtn');
let groupsAmountInput = document.getElementById('ex_elevPicker_groupAmountInput');
let groupsStuAmountInput = document.getElementById('ex_elevPicker_groupsInput');
let noIncludeInput = document.getElementById('ex_elevPicker_noIncludeGroupInput');

let createBtnStatus = false; // false = disabled

groupsAmountInput.addEventListener('input', function () {
    if (groupsAmountInput.value.length > 0 && groupsStuAmountInput.value.length > 0) {
        createBtn.classList.add('dis');
        createBtn.setAttribute('title', 'Du skal udfulde en af felterne (Læs teksten øverst)');
        createBtnStatus = false;
    } else if (groupsAmountInput.value.length > 0 || groupsStuAmountInput.value.length > 0) {
        createBtn.classList.remove('dis');
        createBtn.setAttribute('title', '');
        createBtnStatus = true;
    } else {
        createBtn.classList.add('dis');
        createBtn.setAttribute('title', 'Du skal udfulde en af felterne (Læs teksten øverst)');
        createBtnStatus = false;
    }
});

groupsStuAmountInput.addEventListener('input', function () {
    if (groupsAmountInput.value.length > 0 && groupsStuAmountInput.value.length > 0) {
        createBtn.classList.add('dis');
        createBtn.setAttribute('title', 'Du skal udfulde en af felterne (Læs teksten øverst)');
        createBtnStatus = false;
    } else if (groupsAmountInput.value.length > 0 || groupsStuAmountInput.value.length > 0) {
        createBtn.classList.remove('dis');
        createBtn.setAttribute('title', '');
        createBtnStatus = true;
    } else {
        createBtn.classList.add('dis');
        createBtn.setAttribute('title', 'Du skal udfulde en af felterne (Læs teksten øverst)');
        createBtnStatus = false;
    }
});

createBtn.addEventListener('click', function () {
    if (createBtnStatus === true) {
        if (Number(groupsAmountInput.value)) {
            if (groupsAmountInput.value.length > 0) {
                createGroupsByGroups(groupsAmountInput.value);
            }
        }
        if (Number(groupsAmountInput.value)) {
            if (groupsStuAmountInput.value.length > 0) {
                createGroupsByStudents(groupsStuAmountInput.value);
            }
        }
    }
});

// ----------------------------
// Functions
// ----------------------------

let allGroups = [];

var allStudents = eleverArr.shift(); // elverArr fra random.js

function createGroupsByGroups(groups) {
    var studentsPulled = 0;

    if (noIncludeInput.value.length === 0) {
        while (studentsPulled != eleverArr.length) {
            
        }
    } else { // Hvis der er blevet skrevet elever ind som ikke skal i nogen grupper
        var stutentsId = noIncludeInput.value.split(',');

    }
}

function createGroupsByStudents(students) {
    if (noIncludeInput.value.length === 0) {
        
    } else { // Hvis der er blevet skrevet elever ind som ikke skal i nogen grupper
        var stutentsIds = noIncludeInput.value.split(',');
        
    }
}