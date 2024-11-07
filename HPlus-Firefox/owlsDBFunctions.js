function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('owlDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('owls')) {
                const owlStore = db.createObjectStore('owls', { keyPath: 'id' });
                owlStore.createIndex('senderID', 'senderID', { unique: false });
                owlStore.createIndex('senderName', 'senderName', { unique: false });
                owlStore.createIndex('title', 'title', { unique: false });
                owlStore.createIndex('time', 'time', { unique: false });
                owlStore.createIndex('bbcode', 'bbcode', { unique: false });
                owlStore.createIndex('html', 'html', { unique: false });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };
    });
}

function getBBCodeContent(owlID) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = "https://hportal.co.il/index.php?CODE=04&act=Msg&MID=81871&MSID=" + owlID;
        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const responseHTML = xhr.responseText;
                const parser = new DOMParser();
                const doc = parser.parseFromString(responseHTML, 'text/html');
                const bbcode = doc.querySelector('textarea#Post').value.slice(7, -9);
                resolve(bbcode);
            } else {
                reject('Failed to fetch BBCode');
            }
        };
        xhr.onerror = () => reject('Network error');
        xhr.send();
    });
}

function getHTMLContent(owlID) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const url = "https://hportal.co.il/index.php?act=Msg&CODE=03&MSID=" + owlID
        xhr.open('GET', url);
        xhr.onload = () => {
            if (xhr.status === 200) {
                const responseHTML = xhr.responseText;
                const parser = new DOMParser();
                const doc = parser.parseFromString(responseHTML, 'text/html');

                // Extract the owl title, time, and HTML content
                const owlDetails = doc.querySelector(".postdetails");

                const userAElement = doc.querySelector("span.normalname a");
                const senderID = userAElement.href.split("=")[1];
                const senderName = userAElement.textContent;

                const title = owlDetails.firstChild.textContent;
                // Remove leading comma using regex
                const time = owlDetails.childNodes[1].textContent.replace(/^,\s*/, '');
                const owlHTML = doc.querySelector('div.tableborder').innerHTML;

                resolve({
                    senderID: senderID,
                    senderName: senderName,
                    title: title,
                    time: time,
                    htmlContent: owlHTML
                });
            } else {
                reject('Failed to fetch HTML content');
            }
        };
        xhr.onerror = () => reject('Network error');
        xhr.send();
    });
}

export async function saveOwlToDB(owlID) {
    try {
        // Fetch BBCode and HTML content
        const bbcodeContent = await getBBCodeContent(owlID);
        let { senderID, senderName, title, time, htmlContent } = await getHTMLContent(owlID);

        // Handle dates that are not in the expected format
        // Cuz fuck me why wouldnt there be all the stupid fucking exceptions
        if(isNaN(new Date(time.slice(0, -3)).getTime())) {
            if(time.includes("אתמול") || time.includes("היום")) {
                let hour = time.split("-")[1];
                
                const currentDate = new Date();
                const month = currentDate.toLocaleString('en-US', { month: 'short' });
                const day = String(currentDate.getDate()).padStart(2, '0');
                const year = currentDate.getFullYear();

                /* Now you are probably wondering: Why "XM"?
                Well, the dates are saved in a 24-hour format,
                but always with AM/PM, like "22:43 PM".
                Therefore I always just slice off the last 3 characters,
                otherwise it's an invalid date. Since I don't care enough
                to actually make it AM/PM accordingly, I just use XM */
                time = `${month} ${day} ${year}, ${hour} XM`;
            } else {
                // Symbolic date
                // If I leave it as it is the owl just won't appear
                // So this way it'll appear last (or among them)
                time = "Jan 1 1970, 0:00 AM"
            }
        }

        return new Promise(async (resolve, reject) => {
            // Use openDatabase() to open the IndexedDB
            const db = await openDatabase();
            
            // Create a transaction and access the 'owls' object store
            const transaction = db.transaction('owls', 'readwrite');
            const owlStore = transaction.objectStore('owls');

            // Create an object to store in the DB
            const owlData = {
                id: owlID,
                senderID: senderID,
                senderName: senderName,
                title: title,
                time: time,
                bbcode: bbcodeContent,
                html: htmlContent,
            };

            // Add owl data to the database
            const request = owlStore.put(owlData);

            request.onsuccess = () => {
                browser.storage.sync.get({ owlsSinceExport: 0 }, function (result) {
                    const currentValue = result.owlsSinceExport || 0; // Fallback to 0 if not set
                    const newValue = currentValue + 1;
                
                    // Save the incremented value
                    browser.storage.sync.set({ owlsSinceExport: newValue });
                });

                resolve('Owl ' + owlID + ' saved successfully.');
            };

            request.onerror = (error) => {
                reject('Error saving owl data: ' + error);
            };
        });
    } catch (error) {
        return new Promise((reject) => {
            reject("Error fetching owl data: " + error);
        });
    }
}

export async function getOwlByID(owlID) {
    const db = await openDatabase(); // Open the IndexedDB using openDatabase
    const transaction = db.transaction(['owls'], 'readonly'); // Start a read-only transaction on the 'owls' object store
    const objectStore = transaction.objectStore('owls'); // Access the 'owls' object store

    return new Promise((resolve, reject) => {
        const request = objectStore.get(owlID); // Retrieve the owl by its ID

        request.onsuccess = () => {
            if (request.result) {
                resolve(request.result); // Resolve with the retrieved owl data
            } else {
                reject(`Owl with ID ${owlID} not found`); // Reject if no owl was found
            }
        };

        request.onerror = () => {
            reject('Failed to retrieve owl data'); // Reject on error
        };
    });
}

export async function getAllOwls() {
    const db = await openDatabase(); // Use openDatabase function to open IndexedDB
    const transaction = db.transaction(['owls'], 'readonly'); // Access the 'owls' object store in read-only mode
    const objectStore = transaction.objectStore('owls');

    // Wrap the getAll request in a promise
    return new Promise((resolve, reject) => {
        const allOwlsRequest = objectStore.getAll();

        allOwlsRequest.onsuccess = () => {
            resolve(allOwlsRequest.result);
        };

        allOwlsRequest.onerror = () => {
            reject('Failed to retrieve owls');
        };
    });
}

export async function saveImportedOwls(owlsData) {
    return new Promise(async (resolve, reject) => {
        const db = await openDatabase();
        const transaction = db.transaction('owls', 'readwrite');
        const owlStore = transaction.objectStore('owls');

        let allSaved = true;

        for (const owl of owlsData) {
            try {
                await new Promise((resolveOwl, rejectOwl) => {
                    const request = owlStore.put(owl); // Use `put` to update if exists
                    request.onsuccess = resolveOwl;
                    request.onerror = () => {
                        allSaved = false;
                        rejectOwl('Error saving owl with ID: ' + owl.id);
                    };
                });
            } catch (error) {
                console.error(error);
                reject(`Import failed on owl with ID: ${owl.id}`);
                return; // Exit the function early on error
            }
        }

        if (allSaved) {
            resolve('All owls imported successfully!');
        } else {
            reject('Some owls could not be saved.');
        }
    });
}