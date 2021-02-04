let urlCheck = window.location.href;

// chrome.storage.sync.clear(function () {
//     console.log('Cleared!!!');
// });

if (urlCheck.includes('/login.aspx') != true) {
    var url = window.location.href;
    var urlSplit = url.split('/');
    var schoolId = urlSplit[4];

    var navBar = document.getElementsByTagName('nav');
    var buttonsContainer = navBar[0].children[0];
    var logoutBtn = buttonsContainer.children[1].children[0];
    var navBtnDiv;
    var navBtn;
    var hintSpan;
    var hintSpanInfo;
    var infoWrapper;
    var whatIsThisLink;
    var hintOkBtn;
    var shareBtn;

    var date = new Date();
    var thisMonth = date.getMonth();

    var lastHintOk;
    var hintShowCheck = false;

    // chrome.storage.sync.clear(function () {
    //     console.warn('Cleared!!!');
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
        text.innerHTML = 'ElevPicker er hvor du kan<br>trække tilfældige elever eller<br>lave arbejdsgrupper<br>ud fra en klasse i Lectio.<br><br><span id="ex_elevpicker_share">Hvis du gerne vil<br>dele ElevPicker med nogen,<br>så klik og få et link på næste side.</span><br><br><code id="ex_tool_code">Lectio ElevPicker extension</code>';
        wrapper.appendChild(text);

        var hintWrapper = document.createElement('span');
        hintWrapper.setAttribute('id', 'ex_tooltip-wrapper_hint');
        buttonLink.appendChild(hintWrapper);

        var reminder = document.createElement('span');
        reminder.setAttribute('id', 'ex_tooltip_hint'); // <svg id="ex_ok_svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path id="ex_ok_path" d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>
        reminder.innerHTML = '<span id="ex_tooltip_hintText">Husk du har mig</span><br><button id="ex_hint_info_btn">Hvad er dette?</button><br><button id="ex_hint_ok">Forstået</button>';
        hintWrapper.appendChild(reminder);

        
        navBtnDiv = document.getElementById('ex_elevpickerLectioNavBtn');
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
            goToElevPicker(event.target.id);
        }
    });

    // navBtnDiv.addEventListener('click', goToElevPicker());

    function confirmHint() {
        chrome.storage.sync.set({'elevpicker_last_hint_ok': thisMonth});
    }

    function goToElevPicker(id) {
        if (id === 'ex_has-tooltip' || id === 'ex_tooltip-wrapper') {
            window.open('https://www.lectio.dk/lectio/' + schoolId + '/FindSkema.aspx?type=stamklasse&eleverpicker_path_one', '_self');
        }
    }

    if (url === 'https://www.lectio.dk/lectio/' + schoolId + '/FindSkema.aspx?type=stamklasse&eleverpicker_path_one') {
        var contentDiv = document.getElementById('m_HeaderContent_pageHeader');
        var classesContainer = document.getElementById('m_Content_listecontainer').children[0];
        var closeBtn;

        var elevPickerDiv = document.createElement('div');
        elevPickerDiv.setAttribute('id', 'ex_elevpicker_path_one_div');
        contentDiv.appendChild(elevPickerDiv);

        // var closeDiv = document.createElement('div');
        // closeDiv.setAttribute('id', 'ex_elevpicker_path_one_closeDiv');
        // elevPickerDiv.appendChild(closeDiv);

        var elevPickerHeader = document.createElement('h4');
        elevPickerHeader.setAttribute('id', 'ex_elevpicker_path_one_h4');
        elevPickerHeader.innerHTML = 'ElevPicker';
        elevPickerDiv.appendChild(elevPickerHeader);

        var closeDivBtn = document.createElement('div');
        closeDivBtn.setAttribute('id', 'ex_elevpicker_path_one_closeBtnDiv');
        closeDivBtn.innerHTML = '<svg id="ex_elevpicker_closeSvg" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path fill="#808080" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';
        elevPickerDiv.appendChild(closeDivBtn);

        var elevPickerP = document.createElement('p');
        elevPickerP.setAttribute('id', 'ex_elevpicker_path_one_p');
        elevPickerP.innerHTML = 'For at komme frem til ElevPicker skal du først vælge en klasse.';
        elevPickerDiv.appendChild(elevPickerP);

        var elevPickerShareDiv = document.createElement('div');
        elevPickerShareDiv.setAttribute('id', 'ex_elevpicker_shareDiv');
        elevPickerDiv.appendChild(elevPickerShareDiv);

        var elevPickerShareSpan = document.createElement('span');
        elevPickerShareSpan.setAttribute('id', 'ex_elevpicker_shareSpanText');
        elevPickerShareSpan.innerHTML = 'Hvis du gerne vil dele ElevPicker med nogen, kan du kopier link her:';
        elevPickerShareDiv.appendChild(elevPickerShareSpan);

        var elevPickerShareInput = document.createElement('textarea');
        elevPickerShareInput.setAttribute('id', 'ex_elevpicker_share_link_copy_input');
        // elevPickerShareInput.hidden = true;
        //elevPickerShareInput.value = 'Du som lærer kan finde en tilfældig elev ud fra en klasse eller danne arbejdsgrupper og matrix grupper.\n\nLæs mere på hjemmesiden og se hvordan du enter Lectio ElevPicker extension.\n\nhttps://orc13a.github.io/Lectio-ElevPicker/#install';
        elevPickerShareDiv.appendChild(elevPickerShareInput);

        var elevPickerShareInputText = document.createTextNode('Du som lærer kan finde en tilfældig elev ud fra en klasse eller danne arbejdsgrupper og matrix grupper.\n\nLæs mere på hjemmesiden og se hvordan du henter Lectio ElevPicker extension til din browser.\n\nhttps://orc13a.github.io/Lectio-ElevPicker/#install');
        elevPickerShareInput.appendChild(elevPickerShareInputText);

        var elevPickerShareCopyBtn = document.createElement('div');
        elevPickerShareCopyBtn.setAttribute('id', 'ex_elevpicker_share_copy_btn');
        elevPickerShareCopyBtn.innerHTML = 'Kopier <svg id="ex_elevpicker_share_copy_svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';
        elevPickerShareDiv.appendChild(elevPickerShareCopyBtn);

        var elevPickerHelpLinkDiv = document.createElement('div');
        elevPickerHelpLinkDiv.setAttribute('id', 'ex_elevpicker_helpLinkDiv');
        elevPickerHelpLinkDiv.innerHTML = '<a target="_blank" href="https://orc13a.github.io/Lectio-ElevPicker/help.html">Hjælp til ElevPicker</a>';
        elevPickerDiv.appendChild(elevPickerHelpLinkDiv);

        shareBtn = document.getElementById('ex_elevpicker_share_copy_btn');
        closeBtn = document.getElementById('ex_elevpicker_closeSvg');

        for (let p = 0; p < classesContainer.children.length; p++) {
            for (let a = 0; a < classesContainer.children[p].children.length; a++) {
                var aTag = classesContainer.children[p].children[a];
                var aHref = aTag.href;
                aTag.setAttribute('href', aHref + '&eleverpicker_path_two');
            }
        }

        shareBtn.addEventListener('click', function() {
            var copyText = document.querySelector("#ex_elevpicker_share_link_copy_input");
            copyText.select();
            document.execCommand("copy");

            shareBtn.innerHTML = 'Kopieret <svg id="ex_elevpicker_share_copy_svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16"><path fill="#47b01a" fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';
        });

        closeBtn.addEventListener('click', function() {
            var div = document.getElementById('ex_elevpicker_path_one_div');
            div.style.display = 'none';
        });
    }

    if (url.includes(schoolId + '/SkemaNy.aspx?type=stamklasse&klasseid=') === true && url.includes('&eleverpicker_path_two') === true) {
        var contentDiv_pathTwo = document.getElementById('s_m_HeaderContent_subnav_div').children[1];
        var subnav = document.getElementById('s_m_HeaderContent_subnavigator_generic_tr');
        var eleverBtnId = undefined;
        var closeBtn;

        var elevPickerDiv = document.createElement('div');
        elevPickerDiv.setAttribute('id', 'ex_elevpicker_path_two_div');
        contentDiv_pathTwo.appendChild(elevPickerDiv);

        var elevPickerHeader = document.createElement('h4');
        elevPickerHeader.setAttribute('id', 'ex_elevpicker_path_two_h4');
        elevPickerHeader.innerHTML = 'ElevPicker';
        elevPickerDiv.appendChild(elevPickerHeader);

        var closeDivBtn = document.createElement('div');
        closeDivBtn.setAttribute('id', 'ex_elevpicker_path_one_closeBtnDiv');
        closeDivBtn.innerHTML = '<svg id="ex_elevpicker_closeSvg" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path fill="#808080" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>';
        elevPickerDiv.appendChild(closeDivBtn);

        var elevPickerP = document.createElement('p');
        elevPickerP.setAttribute('id', 'ex_elevpicker_path_two_p');
        elevPickerP.innerHTML = 'For at komme frem til ElevPicker skal du gå ind under "<span id="ex_elevpicker_path_two_span_hint">Elever</span>" siden. Du finder den lige oven over denne kasse.';
        elevPickerDiv.appendChild(elevPickerP);

        closeBtn = document.getElementById('ex_elevpicker_closeSvg');

        for (let a = 0; a < subnav.children.length; a++) {
            var aTag = subnav.children[a].children[0];
            if (aTag.innerHTML === 'Elever') {
               eleverBtnId = aTag.id; 
            }
        }

        if (eleverBtnId != undefined) {
            var spanHintPathTwo = document.getElementById('ex_elevpicker_path_two_span_hint');
            var eleverBtn = document.getElementById(eleverBtnId);
            
            spanHintPathTwo.addEventListener('mouseover', function() {
                eleverBtn.style.backgroundColor = '#b20c00';
                eleverBtn.style.color = 'white';
            });

            spanHintPathTwo.addEventListener('mouseout', function() {
                eleverBtn.style.backgroundColor = null;
                eleverBtn.style.color = null;
            });
        }

        closeBtn.addEventListener('click', function() {
            var div = document.getElementById('ex_elevpicker_path_two_div');
            div.style.display = 'none';
        });
    }
}