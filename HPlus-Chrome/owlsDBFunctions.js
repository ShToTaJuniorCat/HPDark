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


async function IsOwlInDB(owlID) {
    try {
        const db = await openDatabase();
        const transaction = db.transaction('owls', 'readonly');
        const owlStore = transaction.objectStore('owls');
        
        return new Promise((resolve, reject) => {
            const request = owlStore.get(owlID);

            request.onsuccess = () => {
                if (request.result) {
                    resolve(true); // Owl exists
                } else {
                    resolve(false); // Owl does not exist
                }
            };

            request.onerror = () => {
                reject('Error checking for owl in the database.');
            };
        });
    } catch (error) {
        throw new Error('Error opening database');
    }
}

export async function saveOwlToDB(owlID, bbcodeContent, HTMLObjects) {
    if(await getRemainingStorageSpace() < 10) {
        return new Promise((resolve, reject) => {
            reject("Couldn't save owl " + owlID + "; storage is full.");
        });
    }

    const isInDB = await IsOwlInDB(owlID);

    if(isInDB) {
        return new Promise((resolve, reject) => {
            resolve("Owl " + owlID + " already exists in DB.");
        });
    }

    try {
        let { senderID, senderName, title, time, htmlContent } = HTMLObjects;

        // Handle dates that are not in the expected format
        // Cuz fuck me why wouldnt there be all the stupid fucking exceptions
        if(isNaN(new Date(time.slice(0, -3)).getTime())) {
            if(time.includes("אתמול") || time.includes("היום")) {
                let hour = time.split("-")[1];
                
                let targetDate;

                if (time.includes("היום")) {
                    // Today
                    targetDate = new Date();
                } else if (time.includes("אתמול")) {
                    // Yesterday
                    targetDate = new Date();
                    targetDate.setDate(targetDate.getDate() - 1);
                }
                
                const month = targetDate.toLocaleString('en-US', { month: 'short' });
                const day = String(targetDate.getDate()).padStart(2, '0');
                const year = targetDate.getFullYear();

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
                chrome.storage.sync.get({ owlsSinceExport: 0 }, function (result) {
                    const currentValue = result.owlsSinceExport || 0; // Fallback to 0 if not set

                    if(currentValue % 10 == 0) {
                        updateIndexedDBUsage();
                    }

                    const newValue = currentValue + 1;
                
                    // Save the incremented value
                    chrome.storage.sync.set({ owlsSinceExport: newValue });
                });

                resolve('Owl ' + owlID + ' saved successfully.');
            };

            request.onerror = (error) => {
                reject('Error saving owl data: ' + error);
            };
        });
    } catch (error) {
        return new Promise((resolve, reject) => {
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

/**
 * Validates that an owl object has all required fields.
 * @param {Object} owlData - The owl object to validate.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function validateOwlData(owlData) {
    // Define the required fields
    const requiredFields = [
        'id',
        'senderID',
        'senderName',
        'title',
        'time',
        'bbcode',
        'html',
    ];

    // Check if each required field exists and is not undefined or null
    return requiredFields.every(field => owlData.hasOwnProperty(field) && owlData[field] != null);
}

export async function saveImportedOwls(owlsData) {
    return new Promise(async (resolve, reject) => {
        const db = await openDatabase();
        const transaction = db.transaction('owls', 'readwrite');
        const owlStore = transaction.objectStore('owls');

        let allSaved = true;

        for (const owl of owlsData) {
            if(!validateOwlData(owl)) {
                reject("אחד או יותר מהינשופים בפורמט לא נכון. הבקשה נדחתה.");
            }
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
                allSaved = false;
            }
        }

        if (allSaved) {
            resolve('All owls imported successfully!');
        } else {
            reject('Some owls could not be saved.');
        }
    });
}

export async function deleteOwlByID(owlID) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction('owls', 'readwrite');
            const owlStore = transaction.objectStore('owls');

            const request = owlStore.delete(owlID);

            request.onsuccess = () => {
                resolve(`Owl with ID ${owlID} deleted from DB successfully.`);
            };

            request.onerror = (event) => {
                reject(`Failed to delete owl with ID ${owlID} from DB`);
            };
        } catch (error) {
            reject('Database error');
        }
    });
}

export async function deleteAllSavedOwls() {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase(); // Open the IndexedDB using your existing openDatabase() function
            const transaction = db.transaction('owls', 'readwrite');
            const owlStore = transaction.objectStore('owls');

            // Clear all records in the owls object store
            const clearRequest = owlStore.clear();

            clearRequest.onsuccess = () => {
                resolve("All owls have been deleted successfully.");
            };

            clearRequest.onerror = (error) => {
                reject("Error deleting all owls: " + error);
            };

            // Wait for transaction to complete
            await transaction.complete;
            db.close();

            updateIndexedDBUsage();
        } catch (error) {
            reject("Failed to delete all owls: " + error);
        }
    });
}

/**
 * Delete all real owls that have a copy of them in the DB.
*/
export async function deleteAllRealOwlsWithCopy() {
    /**
     * Basically we're deleting from hportal all owls that exist in the DB,
     * not even checking if they still exist on hportal
     * That's because of how hportal handles owl deletion.
     * Don't ask questions.
     */
    return new Promise(async (resolve, reject) => {
        try {
            const allOwls = await getAllOwls(); // Fetch all owls from the database

            if(!allOwls || allOwls < 1) {
                resolve("There are no saved owls.");
            } else {
                // Extract IDs from the returned owl objects
                const ids = allOwls.map(owl => owl.id);
                let owlsToDelete = ids.map(owlID => `${owlID}=1&msgid_${owlID}=yes&`)
                                    .join('');;

                await fetch("https://hportal.co.il/index.php?CODE=06&act=Msg", {
                    "credentials": "include",
                    "headers": {
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                        "Accept-Language": "en-US,en;q=0.5",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Upgrade-Insecure-Requests": "1",
                        "Sec-Fetch-Dest": "document",
                        "Sec-Fetch-Mode": "navigate",
                        "Sec-Fetch-Site": "same-origin",
                        "Sec-Fetch-User": "?1",
                        "Sec-GPC": "1",
                        "Priority": "u=0, i"
                    },
                    "referrer": "https://hportal.co.il/index.php?act=Msg&CODE=01",
                    "body": owlsToDelete + "VID=in&delete=%E4%F1%F8",
                    "method": "POST",
                    "mode": "cors"
                }).then(response => {
                    if(response.ok) {
                        resolve("Owls with copy deleted successfully.");
                    } else {
                        reject("Error deleting owls with copy. Response:", response)
                    }
                });
            }
        } catch (error) {
            reject('Error retrieving all owls: ' + error);
        }
    });
}

/**
 * Delete an owl from hportal itself by it's ID.
*/
export async function deleteRealOwl(owlID) {
    /**
     * Basically we're deleting it without checking if it exists.
     * If it doesn't exist, nothing actually happens.
     * That's because of how hportal handles owl deletion.
     * Don't ask questions.
     */
    
    return new Promise(async (resolve, reject) => {
        await fetch("https://hportal.co.il/index.php?CODE=06&act=Msg", {
            "credentials": "include",
            "headers": {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Content-Type": "application/x-www-form-urlencoded",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-User": "?1",
                "Sec-GPC": "1",
                "Priority": "u=0, i"
            },
            "referrer": "https://hportal.co.il/index.php?act=Msg&CODE=01",
            "body": `${owlID}=1&msgid_${owlID}=yes&VID=in&delete=%E4%F1%F8`,
            "method": "POST",
            "mode": "cors"
        }).then(response => {
            if(response.ok) {
                resolve("Owl " + owlID + " deleted successfully.");
            } else {
                reject("Error deleting owl " + owlID + ". Response:", response)
            }
        });
    });
}

export async function getIndexedDBUsage() {
    try {
        const allOwls = await getAllOwls(); // Retrieve all owls from the IndexedDB

        // Calculate the size of each owl in bytes
        const totalSize = allOwls.reduce((acc, owl) => {
            const jsonString = JSON.stringify(owl);
            return acc + new TextEncoder().encode(jsonString).length;
        }, 0);

        return totalSize;
    } catch (error) {
        return -1;
    }
}

export async function updateIndexedDBUsage() {
    const indexedDBUsage = await getIndexedDBUsage();
    await chrome.storage.sync.set({ indexedDBUsage: indexedDBUsage });
}

async function getRemainingStorageSpace() {
    const currentSize = await chrome.storage.sync.get('indexedDBUsage');
    const maxStorage = await chrome.storage.sync.get('maxOwleryStorage');
    
    // Convert the storage to be in MB as intended
    return (maxStorage.maxOwleryStorage * 1000000) - currentSize.indexedDBUsage;
}

export async function getSavedOwlCount() {
    const db = await openDatabase(); // Open the IndexedDB database
    const transaction = db.transaction(['owls'], 'readonly'); // Open a read-only transaction
    const objectStore = transaction.objectStore('owls');

    return new Promise((resolve, reject) => {
        const countRequest = objectStore.count(); // Count all records in the 'owls' store

        countRequest.onsuccess = () => {
            resolve(countRequest.result); // Return the count of saved owls
        };

        countRequest.onerror = () => {
            reject('Failed to count saved owls'); // Handle errors
        };
    });
}