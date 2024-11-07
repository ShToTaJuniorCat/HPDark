// I couldn't find a setting that can change this
// So I just assume it's the same for everyone always
// If it isn't, fuck it, suffer
const OWLS_IN_PAGE = 100;

const url = 'https://hportal.co.il/index.php?act=Msg&CODE=01&VID=in&sort=rdate';

function saveOwl(owlID) {
    browser.runtime.sendMessage({ action: "save_owl", owlID: owlID }, (response) => {
        if (browser.runtime.lastError) {
            console.error("Error for owl " + owlID + ": ", browser.runtime.lastError.message);
        } else {
            console.log(response.reply);
        }
    });
}

// Save oldest owl
// fetch(url)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.text(); // Parse the response as text
//     })
//     .then(html => {
//         // Create a new DOM parser
//         const parser = new DOMParser();
//         // Parse the HTML string into a document
//         const doc = parser.parseFromString(html, 'text/html');

//         // Find the desired <a> element and get its href
//         let href = $(doc).find('table tr td:first-child img[src="style_images/4/f_norm_no.gif"]')
//             .closest('tr')
//             .find('td:nth-child(2) a')
//             .prop('href');

//         // Log the href if found
//         if (href) {
//             // TODO: Only save owl if it isn't in the DB already
//             let owlID = new URLSearchParams(href.split('?')[1]).get("MSID");

//             saveOwl(owlID);
//         } else {
//             console.log('No matching owl found.');
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching the page:', error, "URL: " + url);
//     });


// ------------------------------
// Let's display the saved owls!!
// This is gonna be a shitshow.
// Update from me when I'm in the middle of it:
// It's a BIG FUCKING shitshow
// Update from me when I'm almost done here:
// It's a BIG FUCKING shitshow

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

async function fetchFirstOwlTime(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();  // Get raw HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Query for the desired element
        const targetElement = doc.querySelector('div.tableborder table tbody tr td:nth-child(4)');

        if (targetElement) {
            return new Date(targetElement.textContent.slice(0, -3)).getTime();
        } else {
            console.log('This is the last page?????');
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

async function getNextNewestTime() {
    const pageOwlSt = new URLSearchParams(window.location.search).get("st") ?? 0;

    const nextNewestTime = await fetchFirstOwlTime(
        "https://hportal.co.il/index.php?act=Msg&CODE=1&VID=in&sort=&st=" + (parseInt(pageOwlSt) + OWLS_IN_PAGE));

    return nextNewestTime;
}

function getCurrentNewestTime() {
    const newestTimeElement = document.querySelector('div.tableborder table tbody tr td:nth-child(4)');
    return new Date(newestTimeElement.textContent.slice(0, -3)).getTime()
}

function getPageNumber() {
    const pageOwlSt = new URLSearchParams(window.location.search).get("st");
    if (pageOwlSt == null || pageOwlSt <= 0) {
        return 1;
    }

    // Apparantly st=100 means we're on the first page, huh
    return (pageOwlSt / OWLS_IN_PAGE) + 1;
}

function fixTime(time) {
    /*
    Convert some possible weird times to hportal dates
    For example:
     - "היום ב-22:11" --> "{today's date formatted MMM DD YYYY}, 22:11"
     - "אתמול ב-22:11" --> "{yesterday's date formatted MMM DD YYYY}, 22:11"
     - "awrgjsfbmg" --> "Jan 1 1970, 0:00"
    */

    if (isNaN(new Date(time.slice(0, -3)).getTime())) {
        // TODO: Make a distinction between today and yesterday
        if (time.includes("אתמול") || time.includes("היום")) {
            let hour = time.split("-")[1];

            const currentDate = new Date();
            const month = currentDate.toLocaleString('en-US', { month: 'short' });
            const day = String(currentDate.getDate()).padStart(2, '0');
            const year = currentDate.getFullYear();

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

function displayOwl(owl) {
    const table = $('div.tableborder table tbody');
    const owlIndex = getInsertIndex(owlDates, fixTime(owl.time));
    if (table.children().length >= owlIndex + 1) {
        table.children().eq(owlIndex + 1).before(
            // TODO: Store the sender username and display it
            `<tr class="dlight">
                <td align="center" valign="middle"><img src="style_images/4/f_norm_no.gif" border="0" alt="הודעה שנקראה"></td>
                <td><a href="${browser.runtime.getURL('savedOwls/savedOwl.html')}?owlID=${owl.id}">${owl.title}</a></td>
                <td><a href="https://hportal.co.il/index.php?showuser=${owl.senderID}">${owl.senderName}</a></td>
                <td>${owl.time}</td>
                <td align="center" dir="ltr">HP+</td>
            </tr>`);
    }
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

                // TODO: Try to understand what the fuck should I do
                // with owls that were sent "היום ב" or "אתמול ב"
                // Cuz fuck me, why wouldnt there be fucking exceptions

                allOwls.forEach(owlObject => {
                    if (isInThisPage(
                        new Date(fixTime(owlObject.time)),
                        nextNewestTime,
                        currentNewestTime,
                        pageNumber
                    )) {
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

displayAllOwls();
