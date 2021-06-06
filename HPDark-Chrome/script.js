/*
Hello!
How you doin? ;)

totalHoursWastedHere = WAYTOOMUCH;
*/

function getCookie(name) {
    // Returns value of cookie named {name}. Function from stackoverflow

    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);

    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }

    return decodeURI(dc.substring(begin + prefix.length, end));
}

function convertMilToHourNMin(millisec) {
    const hours = Math.floor(millisec / 1000 / 3600);
    const minutes = Math.floor((millisec - (hours * 3600000)) / 1000 / 60);
    const sec = Math.floor((millisec - (minutes * 1000 * 60) - (hours * 1000 * 3600)) / 1000);

    return [hours, minutes, sec];
}


// --------------------------------------------
// By default, dark mode is turned on.
chrome.storage.sync.get({ darkMode: null }, function(data) {
    if(data.darkMode == null) {
        /* 
        No storage key named "darkMode".
        It *probably* means that this is the first time the extention
        is used on this device, so... lets create that key!
        */
        chrome.storage.sync.set({ darkMode: true }, function() {
            console.log("darkMode key was not found in storage. Created new key, set to true by default.");
            document.body.classList.add("darkModeOn");
        });
    } else if(data.darkMode == true) {
        // Dark mode is on in storage, so we need to turn off the lights.


        // It's Ella now and I'm planning on stealing your favorite programmer. Cya later!
        
        // Update: She successfully stole me, and my heart. 

        document.body.classList.add("darkModeOn");
    } else {
        /*
        Dark mode if off.
        Yes, technically i dont need this else,
        but it doesnt affect performance too much,
        and it does let me add this comment which 
        might make someone laugh. So why not?
        Anyways, back to work.
        */
    }
});
// --------------------------------------------


// --------------------------------------------
// Create the extension's settings button
var settingsButton = document.createElement("div"); // The base element of the button

settingsButton.addEventListener("click", function () {
    window.open(chrome.extension.getURL("options/options.html"), "_blank"); // When {settingsButton} is clicked, open extension's option page
});

settingsButton.className = "settingsButton";
settingsButton.style.backgroundImage = "url('" + chrome.extension.getURL("images/settings2.svg") + "')"; // Background image of {settingsButton}; the only thing that shows

document.body.appendChild(settingsButton); // {settingsButton}, say hello to the world!
// --------------------------------------------


// --------------------------------------------
// Ban yourself for a certain amount of time
chrome.storage.sync.get({ banMeMillisec: 0, lockBan: false }, function(data) {
    var banned = false;
    var checkTime = setInterval(() => {
        if ((new Date()).getTime() < data.banMeMillisec) {
            // We are behind the date to unban, still banned
            banned = true;
            const timeToEnd = convertMilToHourNMin(data.banMeMillisec - (new Date()).getTime());
            
            if(!data.lockBan) {
                var rest = "את/ה יכול/ה לבטל את הבאן <a style='top: 50%; position: aboslute; color: white;' dir='rtl' href='" + chrome.extension.getURL("options/options.html") + "' target='_blank'>בהגדרות התוסף</a>. ";
            } else {
                var rest = "";
            }

            document.body.innerHTML = "<h2 style='top: 50%; position: aboslute; color: white;' dir='rtl'>את/ה כרגע בבאן על ידי HPD (נוצר על ידי המשתמש/ת). " + rest + "הבאן יסתיים בעוד " + timeToEnd[0] + " שעות, " + timeToEnd[1] + " דקות ו-" + timeToEnd[2] + " שניות (עלול להיות לא מדויק בעד 999 אלפיות השנייה)</h2>";
        } else if(banned) {
            /*
            So basically, if in the last run of {checkTime} (interval) the ban was ended, {banned} would be true.
            In that case, this else-if statement will run, and the user will be notified.
            */

            document.body.innerHTML = "<h2 style='top: 50%; position: aboslute; color: white;'>הבאן הסתיים. <a href='javascript:location.reload()'>לחץ כאן כדי לטעון מחדש את העמוד.</a></h2>";
            chrome.runtime.sendMessage({ msg: "sendNotif", title: "הבאן הסתיים!", body: "הבאן מ-HPortal הסתיים.", icon: "images/settings.svg" }); // Send a desktop notification
            clearInterval(checkTime);
            chrome.storage.sync.set({ banMeMillisec: 0 });
        }
    }, 1000);
});
// --------------------------------------------
