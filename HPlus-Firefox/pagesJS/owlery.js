// I couldn't find a setting that can change this
// So I just assume it's the same for everyone always
// If it isn't, fuck it, suffer
const OWLS_IN_PAGE = 100;

function saveOwl(owlID) {
    return new Promise((resolve, reject) => {
        browser.runtime.sendMessage({ action: "save_owl", owlID: owlID }, (response) => {
            if (response.error || browser.runtime.lastError) {
                reject("Error for owl " + owlID + ": " + (response.error || browser.runtime.lastError));
            } else {
                resolve(response.reply);
            }
        });
    });
}

async function checkOldestOwl() {
    // Save oldest owl
    const owlCapacityMsg = $('td.row1[align="right"][colspan="3"]').text();

    if(owlCapacityMsg.includes("מלאות")) {
        console.log("Owlery is overflowing! Oldest owl is not saved. Please refer to info page for instructions what to do.");
        
        return;
    }

    let owlCapacity = owlCapacityMsg.match(/\d+/)[0];
    const url = 'https://hportal.co.il/index.php?act=Msg&CODE=01&VID=in&sort=rdate';

    browser.storage.sync.get({ owleryCapacityQuota: 95 }, function (items) {
        if(parseInt(owlCapacity) >= parseInt(items.owleryCapacityQuota)) {
            console.log("Owlery capacity exceeds allowed quota. Trying to save oldest owl.");
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text(); // Parse the response as text
                })
                .then(html => {
                    // Create a new DOM parser
                    const parser = new DOMParser();
                    // Parse the HTML string into a document
                    const doc = parser.parseFromString(html, 'text/html');
    
                    // Find the desired <a> element and get its href
                    const href = $(doc).find('table tr td:first-child img[src="style_images/4/f_norm_no.gif"]')
                        .closest('tr')
                        .find('td:nth-child(2) a')
                        .prop('href');
    
                    // Log the href if found
                    if (href) {
                        let owlID = new URLSearchParams(href.split('?')[1]).get("MSID");
    
                        saveOwl(owlID).then(response => {
                            console.log("Response: " + response);

                            // Display the saved owl
                            browser.runtime.sendMessage({ action: "get_owl", owlID: owlID }, (response) => {
                                if (browser.runtime.lastError) {
                                    console.log("failed to get owl");
                                } else {
                                    displayOwl(response.reply);
                                }
                            });

                            // Delete the original owl
                            browser.storage.sync.get({ deleteOldestOwl: false }, function (items) {
                                if(items.deleteOldestOwl) {
                                    browser.runtime.sendMessage({ action: "delete_real_owl", owlID: owlID }, (response) => {
                                        if (browser.runtime.lastError) {
                                            console.log(browser.runtime.lastError);
                                        } else {
                                            console.log(response.reply);

                                            $(`input[name=${owlID}]`).closest("tr").hide();
                                        }
                                    });
                                } else {
                                    console.log("Owl saved but preferences aren't set to delete it.");
                                }
                            });
                        }).catch(error => {
                            console.log(error);
                        });
                    } else {
                        console.log('No matching owl found. This is likely because all owls are unread.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching the page:', error, "URL: " + url);
                });
        } else {
            console.log("Owlery has enough capacity, stop complaining so much!");
        }
    });
}

browser.storage.sync.get({ saveOldestOwl: true }, function (items) {
    if (items.saveOldestOwl) {
        checkOldestOwl();
    } else {
        console.log("Oldest owl not saved because of preferences.")
    }
});

// ------------------------------
// Let's display the saved owls!!
// This is gonna be a shitshow.
// Update from me when I'm in the middle of it:
// It's a BIG FUCKING shitshow
// Update from me when I'm almost done here:
// It's a BIG FUCKING shitshow
// Update from when I'm mostly done here (cuz I wasn't even close before):
// Yup still a shitshow
// Update from when I'm done: Yk how when you finish something and look back at it,
// it seems like it was pretty easy? So nah it didn't happen here. Still a shitshow.

function getInsertIndex(dates, specificDate) {
    // Convert the specific date to a JavaScript Date object
    const targetDate = new Date(specificDate);

    // Loop through the dates array and compare each date
    for (let i = 0; i < dates.length; i++) {
        const currentDate = new Date(dates[i]);

        // Since dates are sorted from newest to oldest, find the first instance
        // where the current date is older than the specific date
        if (currentDate < targetDate) {
            return i; // Return the position to insert the specific date
        }
    }

    // If the targetDate is the oldest, it should be placed at the end of the list
    return dates.length;
}

/**
 * Check if the owl is supposed to be in this page

 * @param {number} owlTime Time of the owl
 * @param {number} nextNewestTime Time of newest owl in the next page. Undefined if there's none
 * @param {number} currentNewestTime Time of newest owl in this page
 * @param {number} pageNumber Number of the page we're checking
 */
function isInThisPage(owlTime, nextNewestTime, currentNewestTime, pageNumber) {
    /*
    I COMPLETELY LOST MY MIND OVER THIS FUCKING FUNCTION
    Forgive me father for I have sinned
    you probably don't understand why it was difficult to write this
    in short, I had to come up with the rules. I hate rules.

    * next page - the page that is one older than the current (current = 3 --> next = 4)
      previous page - the page that is one newer than the current (current = 3 --> previous = 2)
 
    The owl should be in this page if:
    (
        (
            - There is no previous page
            AND
            - The owl is newer than or as new as the next newest owl
        ) OR (
            - There is no next page
            AND
            - The owl is older than the current newest owl
        ) OR (
            - The owl is newer than or as new as the next newest owl
            AND
            - The owl is older than the current newest owl
        )
    )
    */

    return (
        (
            // If this is page 1, there is no previous page
            pageNumber <= 1
            &&
            owlTime >= nextNewestTime
        ) || (
            !nextNewestTime
            &&
            owlTime < currentNewestTime
        ) || (
            owlTime >= nextNewestTime
            &&
            owlTime < currentNewestTime
        )
    )
}

function fixTime(time) {
    /*
    Convert some possible weird times to hportal dates
    For example:
     - "היום ב-22:11" --> "{today's date formatted MMM DD YYYY}, 22:11"
     - "אתמול ב-22:11" --> "{yesterday's date formatted MMM DD YYYY}, 22:11"
     - "awrgjsfbmg" --> "Jan 1 1970, 0:00"
    
    Major pain in the ass
    */

    if (isNaN(new Date(time.slice(0, -3)).getTime())) {
        if (time.includes("אתמול") || time.includes("היום")) {
            let hour = time.split("-")[1].trim();
        
            const currentDate = new Date();
            let targetDate;
        
            if (time.includes("היום")) {
                // Today
                targetDate = currentDate;
            } else if (time.includes("אתמול")) {
                // Yesterday
                targetDate = new Date(currentDate);
                targetDate.setDate(currentDate.getDate() - 1);
            }
        
            const month = targetDate.toLocaleString('en-US', { month: 'short' });
            const day = String(targetDate.getDate()).padStart(2, '0');
            const year = targetDate.getFullYear();
        
            return `${month} ${day} ${year}, ${hour}`;
        } else {
            // Symbolic date
            // If I leave it as it is the owl just won't appear
            // So this way it'll appear last (or among them)
            return "Jan 1 1970, 00:00"
        }
    }

    return time.slice(0, -3);
}

async function fetchFirstOwlTime(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Fetch raw binary data
        const buffer = await response.arrayBuffer();

        // Decode using TextDecoder with the correct encoding (UTF-8 or windows-1255 for Hebrew)
        const decoder = new TextDecoder("windows-1255"); // Use "UTF-8" if the page is encoded as UTF-8
        const html = decoder.decode(buffer);

        // Parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Query for the desired element
        const targetElement = doc.querySelector('div.tableborder table tbody tr td:nth-child(4)');

        if (targetElement) {
            return new Date(fixTime(targetElement.textContent)).getTime();
        } else {
            // Requested URL has no owls in it
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

async function getNextNewestTime() {
    const pageOwlSt = new URLSearchParams(window.location.search).get("st") || 0;

    const nextNewestTime = await fetchFirstOwlTime(
        "https://hportal.co.il/index.php?act=Msg&CODE=1&VID=in&sort=&st=" + (parseInt(pageOwlSt) + OWLS_IN_PAGE));

    return nextNewestTime;
}

function getCurrentNewestTime() {
    const newestTimeElement = document.querySelector('div.tableborder table tbody tr td:nth-child(4)');

    if(newestTimeElement) {
        return new Date(fixTime(newestTimeElement.textContent)).getTime();
    }

    return null;
}

function getPageNumber() {
    const pageOwlSt = new URLSearchParams(window.location.search).get("st");
    if (pageOwlSt == null || pageOwlSt <= 0) {
        return 1;
    }

    // Apparantly st=0 means we're on the first page, huh
    return (pageOwlSt / OWLS_IN_PAGE) + 1;
}

function displayOwl(owl) {
    const table = $('div.tableborder table tbody');
    const owlIndex = getInsertIndex(owlDates, fixTime(owl.time));
    if (table.children().length >= owlIndex + 1) {
        const $newRow = $(`
            <tr class="dlight" id="HPlusOwl_${owl.id || 0}">
                <td align="center" valign="middle">
                    <img src="style_images/4/f_norm_no.gif" border="0" alt="הודעה שנקראה">
                </td>
                <td>
                    <a href="${browser.runtime.getURL('savedOwls/savedOwl.html')}?owlID=${owl.id || 0}">${owl.title || "כותרת ינשוף"}</a>
                </td>
                <td>
                    <a href="https://hportal.co.il/index.php?showuser=${owl.senderID || 0}">${owl.senderName || "שולח ינשוף"}</a>
                </td>
                <td>${owl.time || "זמן"}</td>
                <td align="center" dir="ltr">
                    <span class="deleteHPlusOwl" id="DeleteHPlusOwl_${owl.id || 0}">מחק</span>
                </td>
            </tr>
        `);

        table.children().eq(owlIndex + 1).before($newRow);

        $("#DeleteHPlusOwl_" + owl.id).click(function () {
            browser.runtime.sendMessage({ action: "delete_owl_from_db", owlID: owl.id }, (response) => {
                if (browser.runtime.lastError) {
                    console.error("Error:", browser.runtime.lastError.message);
                    updateState("error-saving");
                } else {
                    console.log(response.reply);
                    $($("#HPlusOwl_" + owl.id)).remove();
                }
            });
        });
    }
}

function isIDExist(owlID) {
    // Check if there is an owl displayed in this page with ID = owlID
    return document.querySelector(`a[href*="MSID=${owlID}"]`) != null;
}

async function displayAllOwls() {
    try {
        browser.runtime.sendMessage({ action: "get_all_owls" }, async (response) => {
            if (browser.runtime.lastError) {
                console.error("Error:", browser.runtime.lastError.message);
            } else {
                const allOwls = response.reply;

                const nextNewestTime = await getNextNewestTime();
                const currentNewestTime = getCurrentNewestTime();
                const pageNumber = getPageNumber();

                allOwls.sort((firstOwl, secondOwl) =>
                    new Date(fixTime(firstOwl.time)) - new Date(fixTime(secondOwl.time))
                );

                let displayDuplicateOwls = await browser.storage.sync.get('displayDuplicateOwls');
                displayDuplicateOwls = displayDuplicateOwls.displayDuplicateOwls;

                allOwls.forEach(owlObject => {
                    // Display if (user wants to display duplicates) or (user doesn't and owl isn't duplicated)
                    //  (                                 ||                                        )
                    //  (                                 \/                                        )
                    if (((!displayDuplicateOwls && !isIDExist(owlObject.id)) || displayDuplicateOwls) &&
                        isInThisPage(
                            new Date(fixTime(owlObject.time)),
                            nextNewestTime,
                            currentNewestTime,
                            pageNumber
                        )
                    ) {
                        displayOwl(owlObject);
                    }
                });
            }
        });
    } catch (error) {
        console.error('Database error:', error);
    }
}

const owlDates = $('div.tableborder table tbody tr td:nth-child(4)').map(function () {
    return fixTime($(this).text());
}).get();

browser.storage.sync.get({ owlsSinceExport: 0, owlsWarningInput: 5, displaySavedOwls: true }, function (items) {
    if (items.owlsSinceExport >= items.owlsWarningInput) {
        $("<span>", {
            id: "owlsOverflowWarning",
            text: ` ${items.owlsSinceExport} ינשופים נשמרו מאז הייצוא האחרון!`,
            css: {
                color: "yellow",
                fontWeight: "bold",
                fontSize: "20px"
            }
        }).appendTo("td#ucpcontent div.maintitle")
    }

    // Only display saved owls if the user wants us to
    if(items.displaySavedOwls) {
        const sort = new URLSearchParams(window.location.search).get("msg_date");
        if(sort == null || sort == "msg_date") {
            displayAllOwls();
        }
    }
});

// Warn the user when they delete real owls
$('input[type="submit"][name="delete"]').on('click', function (event) {
    if (!confirm("אתה בטוח שאתה רוצה למחוק לצמיתות את הינשופים שנבחרו? תוכנם לא ניתן יהיה לשחזור.")) {
        event.preventDefault(); // Cancel the form submission
    }
});