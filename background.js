// function handleInstalled(details) {
//     console.log(details.reason);
//     chrome.tabs.create({
//         url: "https://orc13a.github.io/Lectio-ElevPicker/get-started.html"
//     });
// }

// chrome.runtime.onInstalled.addListener(handleInstalled);

chrome.runtime.onInstalled.addListener((details) => {
    const currentVersion = chrome.runtime.getManifest().version;
    const previousVersion = details.previousVersion;
    const reason = details.reason;
    
    console.log(previousVersion);
    console.log(currentVersion);
 
    switch (reason) {
        case 'install':
            console.log('New User installed the extension.');
            chrome.tabs.create({
                url: "https://orc13a.github.io/Lectio-ElevPicker/get-started.html"
            });
            break;
        case 'update':
            console.log('User has updated their extension.');
            break;
        case 'chrome_update':
        case 'shared_module_update':
        default:
            console.log('Other install events within the browser');
            break;
    }
 });