import { 
    saveOwlToDB, getAllOwls, getOwlByID, saveImportedOwls, deleteOwlByID, deleteAllSavedOwls, deleteAllRealOwlsWithCopy, deleteRealOwl
} from './owlsDBFunctions.js';

// Handle background messages 
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == "save_owl" && message.owlID) {
        console.log("attempting to save owl " + message.owlID);
        saveOwlToDB(message.owlID)
            .then(response => {
                console.log("Owl " + message.owlID + " saved successfully.");
                sendResponse({ reply: response });
            })
            .catch(error => {
                console.log("Error: " + error);
                sendResponse({ error: error });
            });

        return true;
    } else if (message.action == "get_all_owls") {
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
    } else if (message.action == "get_owl" && message.owlID) {
        console.log("attempting to retreive owl " + message.owlID);
        getOwlByID(message.owlID)
            .then(response => {
                console.log("Owl " + message.owlID + " retreived successfully.");
                sendResponse({ reply: response });
            })
            .catch(error => {
                console.log("Error: " + error);
                sendResponse({ reply: error });
            });

        return true;
    } else if (message.action == "import_owls" && message.owls) {
        console.log("attempting to import owls");
        saveImportedOwls(message.owls)
            .then(response => {
                console.log(response);
                sendResponse({ reply: response });
            })
            .catch(error => {
                console.log("Error: " + error);
                sendResponse({ reply: error });
            });

        return true;
    } else if (message.action == "delete_owl_from_db" && message.owlID) {
        console.log("Attempting to delete owl " + message.owlID + " from DB");
        deleteOwlByID(message.owlID)
            .then(response => {
                console.log(response);
                sendResponse({ reply: response });
            })
            .catch(error => {
                console.log("Error: " + error);
                sendResponse({ reply: error });
            });
        
        return true;
    } else if (message.action == "delete_all_saved_owls") {
        console.log("Attempting to delete owl all saved owls");
        deleteAllSavedOwls()
            .then(response => {
                console.log(response);
                sendResponse({ reply: response });
            })
            .catch(error => {
                console.log("Error: " + error);
                sendResponse({ reply: error });
            });
        
        return true;
    } else if (message.action == "delete_owl_with_copy") {
        console.log("Attempting to delete owl all owls with saved copy");
        deleteAllRealOwlsWithCopy()
            .then(response => {
                console.log(response);
                sendResponse({ reply: response });
            })
            .catch(error => {
                console.log("Error: " + error);
                sendResponse({ reply: error });
            });
        
        return true;
    } else if (message.action == "delete_real_owl" && message.owlID) {
        console.log("Attempting to delete owl " + message.owlID + " from hportal");
        deleteRealOwl(message.owlID)
            .then(response => {
                console.log(response);
                sendResponse({ reply: response });
            })
            .catch(error => {
                console.log("Error: " + error);
                sendResponse({ reply: error });
            });
        
        return true;
    }
});

// Set this url to open upon uninstall
browser.runtime.setUninstallURL("https://forms.gle/r2afqHqEr3P7cXoF7");
