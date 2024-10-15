/*
Hello!
How you doin? ;)

totalHoursWastedHere = WAYTOOMUCH;
*/

function convertMilToHourNMin(millisec) {
    const hours = Math.floor(millisec / 1000 / 3600);
    const minutes = Math.floor((millisec - (hours * 3600000)) / 1000 / 60);
    const sec = Math.floor((millisec - (minutes * 1000 * 60) - (hours * 1000 * 3600)) / 1000);

    return [hours, minutes, sec];
}


// --------------------------------------------
// Handle dark mode according to preferences
// By default, dark mode is turned on.
browser.storage.sync.get({ darkMode: null }, function(data) {
    if(data.darkMode == true) {
        // It's Ella now and I'm planning on stealing your favorite programmer. Cya later!
        
        // Update: She successfully stole me, and my heart. 


        // Dark mode is on in storage, so we need to turn off the lights.
        $('body').addClass('darkModeOn');
    } else if(data.darkMode == null) {
        /* 
        No storage key named "darkMode".
        It *probably* means that this is the first time the extention
        is used on this device, so... lets create that key!
        */
        browser.storage.sync.set({ darkMode: true }, function() {
            console.log("darkMode key was not found in storage. Created new key, set to true by default.");
            $('body').addClass('darkModeOn');
        });
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
let settingsButton = $("<div>", {
    class: "settingsButton", // Class for the button
    css: {
        "background-image": "url('" + browser.runtime.getURL("images/settings2.svg") + "')"
    }
});

settingsButton.on("click", function () {
    // When {settingsButton} is clicked, open extension's option page
    window.open(browser.runtime.getURL("options/options.html"), "_blank"); 
});

$(document.body).append(settingsButton); // {settingsButton}, say hello to the world!
// --------------------------------------------

// --------------------------------------------
// Ban yourself for a certain amount of time
// Yeah i'm too lazy to convert this into jQuery. Deal with it.
browser.storage.sync.get({ banMeMillisec: 0, lockBan: false }, function(data) {
    let banned = false;
    var checkTime = setInterval(() => {
        if ((new Date()).getTime() < data.banMeMillisec) {
            // We are behind the date to unban, still banned
            let rest = "";
            banned = true;
            const timeToEnd = convertMilToHourNMin(data.banMeMillisec - (new Date()).getTime());
            
            if(!data.lockBan) {
                rest = "את/ה יכול/ה לבטל את הבאן <a style='top: 50%; position: aboslute; color: white;' dir='rtl' href='" + browser.runtime.getURL("options/options.html") + "' target='_blank'>בהגדרות התוסף</a>. ";
            } else {
                rest = "";
            }

            document.body.innerHTML = "<h2 style='top: 50%; position: aboslute; color: white;' dir='rtl'>את/ה כרגע בבאן על ידי HPD (נוצר על ידי המשתמש/ת). " + rest + "הבאן יסתיים בעוד " + timeToEnd[0] + " שעות, " + timeToEnd[1] + " דקות ו-" + timeToEnd[2] + " שניות (עלול להיות לא מדויק בעד 999 אלפיות השנייה)</h2>";
        } else if(banned) {
            document.body.innerHTML = "<h2 style='top: 50%; position: aboslute; color: white;'>הבאן הסתיים. <a href='javascript:location.reload()'>לחץ כאן כדי לטעון מחדש את העמוד.</a></h2>";
        }
    }, 1000);
});
// --------------------------------------------