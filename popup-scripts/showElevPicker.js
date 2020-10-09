window.addEventListener('DOMContentLoaded', (event) => {

    var showElevPickerSwitch = document.getElementById('ex_switchPage');
        
    chrome.storage.sync.get("showElevPickerSwitchStorage", function (result) {
        if(result.showElevPickerSwitchStorage === undefined) {
            showElevPickerSwitch.checked = true;
            console.log({showElevPickerSwitchStorage: true});
        } else {
            showElevPickerSwitch.checked = result.showElevPickerSwitchStorage;
            console.log({showElevPickerSwitchStorage: result.showElevPickerSwitchStorage});
        }
    });
    
    document.getElementById('ex_switchPage').addEventListener('change', function name() {
        if (showElevPickerSwitch.checked === true) {
            showElevPickerSwitch.checked = true;
            chrome.storage.sync.set({"showElevPickerSwitchStorage": true});
            console.log({ex_switchPopup: true});
        } else {
            showElevPickerSwitch.checked = false;
            chrome.storage.sync.set({"showElevPickerSwitchStorage": false});
            console.log({ex_switchPopup: false});
        }
        
        // chrome.storage.sync.get("showElevPickerSwitchStorage", function (result) {
        //     console.log(result.showElevPickerSwitchStorage);
        // });        
    });

});