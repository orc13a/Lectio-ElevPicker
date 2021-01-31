let cancelBtn = document.getElementById('ex_elevPicker_cancelGroupBtn');
let createBtn = document.getElementById('ex_elevPicker_createGroupBtn');
let groupsAmountInput = document.getElementById('ex_elevPicker_groupAmountInput');
let groupsStuAmountInput = document.getElementById('ex_elevPicker_groupsInput');
let noIncludeInput = document.getElementById('ex_elevPicker_noIncludeGroupInput');
let groupsFileName = document.getElementById('ex_elevPicker_groupFileTitleInput');
let matrixGrupperCheck = document.getElementById('ex_elevPicker_matrixGroupCheckbox');

let createBtnStatus = false; // false = disabled
let notIncludeErr = false;

groupsFileName.addEventListener('input', function() {
    if (groupsFileName.value.length > 13) {
        groupsFileName.setAttribute('size', groupsFileName.value.length);
    } else {
        groupsFileName.setAttribute('size', "13");
    }
});

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

    if (groupsAmountInput.value.length > 0) {
        groupsAmountInput.setAttribute('size', groupsAmountInput.value.length);
    } else {
        groupsAmountInput.setAttribute('size', "1");
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

    if (groupsStuAmountInput.value.length > 0) {
        groupsStuAmountInput.setAttribute('size', groupsStuAmountInput.value.length);
    } else {
        groupsStuAmountInput.setAttribute('size', "1");
    }
});

createBtn.addEventListener('click', function () {
    if (createBtnStatus === true) {
        if (Number(groupsAmountInput.value)) {
            if (groupsAmountInput.value.length > 0 && eleverArr.length > 1) {
                createGroupsByGroups(Number(groupsAmountInput.value));
            }
        }
        if (Number(groupsStuAmountInput.value)) {
            if (groupsStuAmountInput.value.length > 0 && eleverArr.length > 1) {
                createGroupsByStudents(Number(groupsStuAmountInput.value));
            }
        }
    }
});

noIncludeInput.addEventListener('input', function () {
    if (noIncludeInput.value.length > 0) {
        var inputSplited = noIncludeInput.value.split(',');
        notIncludeErr = false;

        for (let i = 0; i < inputSplited.length; i++) {
            if (Number(inputSplited[i]) === 0 || !Number(inputSplited[i])) {
                notIncludeErr = true;
            }
        }

        if (notIncludeErr === true) {
            createBtn.classList.add('dis');
            createBtn.setAttribute('title', 'Du må kunne have tal og komma som adskilder talene');
        } else if (notIncludeErr === false && createBtnStatus === true) {
            createBtn.classList.remove('dis');
            createBtn.setAttribute('title', '');
        }
    }

    if (noIncludeInput.value.length > 4) {
        noIncludeInput.setAttribute('size', noIncludeInput.value.length);
    } else {
        noIncludeInput.setAttribute('size', "4");
    }
});

// ----------------------------
// Functions
// ----------------------------

var allStudents = eleverArr.shift(); // elverArr fra random.js

function createGroupsByGroups(groups) {
    var allGroups = [];
    
    var allStudentsPulled = [];
    // var eleverArrMixed = [];
    var studentsPulled = 0;
    var studentPulled;
    // var student = 0;
    // var groupsMade = 0;
    // var prGroup = Math.floor(eleverArr.length / groups);
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

        //download_txt(allGroups);

    } else { // Hvis der er blevet skrevet elever ind som ikke skal i nogen grupper
        
        if (notIncludeErr === false) {
            var noIncludeStudents = noIncludeInput.value.split(',');

            for (let i = 0; i < noIncludeStudents.length; i++) {
                noIncludeStudents[i] = Number(noIncludeStudents[i]) - 1;
            }

            while (studentsPulled != (eleverArr.length - noIncludeStudents.length)) {
                
                studentPulled = getRandomNr(0, eleverArr.length - 1);
                
                if (allStudentsPulled.length == 0) {
                    while (noIncludeStudents.includes(studentPulled) === true) {
                        studentPulled = getRandomNr(0, eleverArr.length  - 1);
                        if (noIncludeStudents.includes(studentPulled) === false) {
                            break;
                        }
                    }
                }

                if (allStudentsPulled.length != 0) {
                    while (allStudentsPulled.includes(studentPulled) === true || noIncludeStudents.includes(studentPulled) === true) {
                        studentPulled = getRandomNr(0, eleverArr.length  - 1);
                        if (allStudentsPulled.includes(studentPulled) === false && noIncludeStudents.includes(studentPulled) === false) {
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
        }
    }
    download_txt(allGroups);
}



function createGroupsByStudents(students) {
    var allGroups = [];
    
    var allStudentsPulled = [];
    var studentsPulled = 0;
    var studentPulled;
    var groupsMade = allGroups.length;
    var groupNr = 0;
    var group = [];
    
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

            //allGroups[groupNr].push(/*eleverArr[studentPulled]*/ studentFirstname + ' ' + studentLastname);
            group.push(studentFirstname + ' ' + studentLastname);
            allStudentsPulled.push(studentPulled);

            if (group.length === students) {
                allGroups.push(group);
                groupsMade++;
                group = [];
            }
            
            studentsPulled++;
        }

        if (group.length < students && group.length > 0) {
            for (let i = 0; i < group.length; i++) {
                allGroups[groupNr].push(group[i]);
                
                if (groupNr === groupsMade - 1) {
                    groupNr = 0;
                } else {
                    groupNr++;
                }
            }
            group = [];
        }
    } else { // Hvis der er blevet skrevet elever ind som ikke skal i nogen grupper
        var noIncludeStudents = noIncludeInput.value.split(',');
        var newEleverArrar = eleverArr;
        for (let i = 0; i < noIncludeStudents.length; i++) {
            noIncludeStudents[i] = Number(noIncludeStudents[i]) - 1;
        }
        
        for (let i = 0; i < newEleverArrar.length; i++) {
            for (let n = 0; n < noIncludeStudents.length; n++) {
                if (i === noIncludeStudents[n]) {
                    newEleverArrar.splice(i, 1);
                }
            }
        }

        while (studentsPulled != newEleverArrar.length) {
            studentPulled = getRandomNr(0, newEleverArrar.length - 1);

            if (allStudentsPulled.length != 0) {
                while (allStudentsPulled.includes(studentPulled) === true) {
                    studentPulled = getRandomNr(0, newEleverArrar.length  - 1);
                    if (allStudentsPulled.includes(studentPulled) === false) {
                        break;
                    }
                }
            }

            var studentFirstname = eleverArr[studentPulled].children[2].children[0].children[0].innerHTML.split(' ')[0];
            var studentLastname = eleverArr[studentPulled].children[3].children[0].innerHTML;

            //allGroups[groupNr].push(/*eleverArr[studentPulled]*/ studentFirstname + ' ' + studentLastname);
            group.push(studentFirstname + ' ' + studentLastname);
            allStudentsPulled.push(studentPulled);

            if (group.length === students) {
                allGroups.push(group);
                groupsMade++;
                group = [];
            }
            
            studentsPulled++;
        }

        if (group.length < students && group.length > 0) {
            for (let i = 0; i < group.length; i++) {
                allGroups[groupNr].push(group[i]);
                
                if (groupNr === groupsMade - 1) {
                    groupNr = 0;
                } else {
                    groupNr++;
                }
            }
            group = [];
        }
    }
    download_txt(allGroups);
}

// ----------------------------
// Make matrix groups
// ----------------------------

function makeMatrixGroups(createGroups) {
    var allMatrixGroups = [];
    var matrixGroup = [];
    var studentsPickedArr = [];
    var studentsPicked = 0;
    var studentsIncluded = 0;
    var antalGrupper = createGroups.length;
    var loopCheck = 0;
    var mGroup = 0;

    for (let i = 0; i < createGroups.length; i++) {
        studentsIncluded = studentsIncluded + createGroups[i].length;
    }

    for (let i = 0; i < antalGrupper; i++) {
        matrixGroup = [];
        allMatrixGroups.push(matrixGroup);

        matrixGroup = [];
        studentsPickedArr.push(matrixGroup);
    }

    for (let g = 0; g < createGroups.length; g++) {
        
        for (let i = 0; i < createGroups[g].length; i++) {
            loopCheck = 0;

            if (studentsPicked != studentsIncluded) {
                studentPulled = getRandomNr(0, createGroups[g].length - 1);
                
                if (studentsPickedArr[g].length > 0) {
                    while (studentsPickedArr[g].includes(studentPulled) === true) {
                        
                        studentPulled = getRandomNr(0, createGroups[g].length - 1);
                        
                        if (studentsPickedArr[g].includes(studentPulled) === false) {
                            break;
                        }

                        if (loopCheck === 5000) {
                            console.error('loop crash!');
                            break;
                        }
                        loopCheck++;
                    }
                }
                
                allMatrixGroups[mGroup].push(createGroups[g][studentPulled]);
                studentsPickedArr[g].push(studentPulled);

                if (mGroup === antalGrupper - 1) {
                    mGroup = 0;
                } else {
                    mGroup++;
                }
            }
            studentsPicked++;
        }
    }
    return allMatrixGroups;
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
        csv += " - Gruppe " + gruppeNr + " - ";
        csv += "\n";
        csv += row.join(', ');
        csv += "\n\n";

        gruppeNr++;
    });

    if (matrixGrupperCheck.checked === true) {
        var matrixGroups = makeMatrixGroups(data);
        
        gruppeNr = 1;
        csv += '\n\n';

        matrixGroups.forEach(function(row) {
            csv += " - Matix gruppe " + gruppeNr + " - ";
            csv += "\n";
            csv += row.join(', ');
            csv += "\n\n";
    
            gruppeNr++;
        });
    }

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