import { saveOwlToDB, getAllOwls, getOwlByID, saveImportedOwls } from './owlsDBFunctions.js';

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.action == "save_owl" && message.owlID) {
        console.log("attempting to save owl " + message.owlID);
        saveOwlToDB(message.owlID)
        .then(response => {
            console.log("Owl " + message.owlID + " saved successfully.");
            sendResponse({ reply: response });
        })
        .catch(error => {
            console.log("Error: " + error);
            sendResponse({ reply: error });
        });

        return true;
    } else if(message.action == "get_all_owls") {
        console.log("attempting to get all owls");

        getAllOwls()
        .then(response => {
            console.log("Success!");
            sendResponse({ reply: response });
        })
        .catch(error => {
            console.log("Error: " + error);
            sendResponse({ reply: error });
        });

        return true;
    } else if(message.action == "get_owl" && message.owlID) {
        console.log("attempting to retreive owl " + message.owlID);
        getOwlByID(message.owlID)
        .then(response => {
            console.log("Success!");
            sendResponse({ reply: response });
        })
        .catch(error => {
            console.log("Error: " + error);
            sendResponse({ reply: error });
        });

        return true;
    } else if(message.action == "import_owls" && message.owls) {
        console.log("attempting to import owls");
        saveImportedOwls(message.owls)
        .then(response => {
            console.log("Success!");
            sendResponse({ reply: response });
        })
        .catch(error => {
            console.log("Error: " + error);
            sendResponse({ reply: error });
        });

        return true;
    }
});

browser.runtime.setUninstallURL("https://forms.gle/r2afqHqEr3P7cXoF7");