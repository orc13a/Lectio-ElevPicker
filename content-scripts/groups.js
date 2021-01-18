let cancelBtn = document.getElementById('ex_elevPicker_cancelGroupBtn');
let createBtn = document.getElementById('ex_elevPicker_createGroupBtn');
let groupsAmountInput = document.getElementById('ex_elevPicker_groupAmountInput');
let groupsStuAmountInput = document.getElementById('ex_elevPicker_groupsInput');
let noIncludeInput = document.getElementById('ex_elevPicker_noIncludeGroupInput');
let groupsFileName = document.getElementById('ex_elevPicker_groupFileTitleInput');

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
                createGroupsByGroups(Number(groupsAmountInput.value));
            }
        }
        if (Number(groupsAmountInput.value)) {
            if (groupsStuAmountInput.value.length > 0) {
                createGroupsByStudents(Number(groupsStuAmountInput.value));
            }
        }
    }
});

// ----------------------------
// Functions
// ----------------------------

var allStudents = eleverArr.shift(); // elverArr fra random.js

function createGroupsByGroups(groups) {
    var allGroups = [];
    
    var allStudentsPulled = [];
    var eleverArrMixed = [];
    var studentsPulled = 0;
    var studentPulled;
    var student = 0;
    var groupsMade = 0;
    var prGroup = Math.floor(eleverArr.length / groups);
    var groupNr = 0;
    var group = [];
    
    for (let i = 0; i < groups; i++) {
        group = [];
        allGroups.push(group);
    }

    if (noIncludeInput.value.length === 0) {
        
        while (studentsPulled != eleverArr.length) {

            studentPulled = getRandomNr(0, eleverArr.length - 1);
 
            if (allStudentsPulled.length != 0) {
                while (allStudentsPulled.includes(studentPulled) === true) {
                    studentPulled = getRandomNr(0, eleverArr.length  - 1);
                    if (allStudentsPulled.includes(studentPulled) === false) {
                        break;
                    }
                }
            }
            
            var studentFirstname = eleverArr[studentPulled].children[2].children[0].children[0].innerHTML.split(' ')[0];
            var studentLastname = eleverArr[studentPulled].children[3].children[0].innerHTML;

            allGroups[groupNr].push(/*eleverArr[studentPulled]*/ studentFirstname + ' ' + studentLastname);
            allStudentsPulled.push(studentPulled);
            
            if (groupNr === groups - 1) {
                groupNr = 0;
            } else {
                groupNr++;
            }
            
            studentsPulled++;
        }

        download_txt(allGroups);
    } else { // Hvis der er blevet skrevet elever ind som ikke skal i nogen grupper
        var noInculdeStutentsIdArr = noIncludeInput.value.split(',');

    }
}

function createGroupsByStudents(students) {
    if (noIncludeInput.value.length === 0) {
        
    } else { // Hvis der er blevet skrevet elever ind som ikke skal i nogen grupper
        var stutentsIds = noIncludeInput.value.split(',');
        
    }
}

// ----------------------------
// Download grupper
// ----------------------------

function download_txt(data) {
    var fileNameJoin;
    var fileTitle;

    if (groupsFileName.value.length === 0) {
        fileTitle = 'Grupper';
        fileNameJoin = 'Grupper';
    } else {
        fileNameJoin = groupsFileName.value.split(' ').join('_');
        fileTitle = groupsFileName.value;
    }
    
    var csv = fileTitle + '\n\n';
    var gruppeNr = 1;

    data.forEach(function(row) {
        csv += "Gruppe " + gruppeNr;
        csv += "\n";
        csv += row.join(', ');
        csv += "\n\n";

        gruppeNr++;
    });
 
    csv += '\n\n\n\n';
    csv += 'Grupper lavet med Lectio ElevPicker,\n';
    csv += 'Chrome og Firefox extension for Lectio.\n';

    //console.log(csv);
    //window.open('data:text/csv;charset=utf-8,' + encodeURI(csv), '_blank');
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(csv);
    //hiddenElement.href = 'data:text/csv;charset=UTF-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    // hiddenElement.download = fileName + '.csv';
    hiddenElement.download = fileNameJoin + '.txt';
    hiddenElement.click();
}