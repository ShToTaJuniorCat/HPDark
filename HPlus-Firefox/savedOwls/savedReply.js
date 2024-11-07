// Function to fetch the owl from IndexedDB
function fetchOwlFromDB(owlID) {
    return new Promise((resolve, reject) => {
        // Open the IndexedDB
        const request = indexedDB.open("owlDB", 1);
        
        request.onerror = function(event) {
            reject("Error opening database");
        };
        
        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(["owls"], "readonly");
            const objectStore = transaction.objectStore("owls");
            const owlRequest = objectStore.get(owlID);
            
            owlRequest.onsuccess = function(event) {
                const owl = event.target.result;
                if (owl) {
                    resolve(owl);
                } else {
                    reject("Owl not found");
                }
            };
            
            owlRequest.onerror = function(event) {
                reject("Error fetching owl");
            };
        };
    });
}

async function setOwl() {
    try {
        const owlID = new URLSearchParams(window.location.search).get('MSID');
        const owl = await fetchOwlFromDB(owlID);
        document.getElementsByName("msg_title")[0].value = owl.title;
        document.getElementById("Post").value = "[QUOTE]" + owl.bbcode + "[/QUOTE]";
    } catch (error) {
        document.getElementById("Post").value = 'Failed to fetch owl: ' + error;
    }
}

setOwl();
