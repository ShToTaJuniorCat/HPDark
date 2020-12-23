/*
Hello!
How you doin? ;)

I wasted SO much time trying to figure out how to get
a global variable with all stored data in it without
making the user wait, I just gave up now.
So, for myself, here is the code of getting al item
from storage:
chrome.storage.sync.get({ <REPLACE WITH NAME OF KEY>: <REPLACE WITH FAIL VALUE>, function(data) { 
    data.<REPLACE WITH NAME OF KEY>;
});

And setting a value to item:
chrome.storage.sync.set({<REPLACE WITH NAME OF KEY>: <REPLACE WITH VALUE OF KEY>}, function() {
  // Key is now set to the value.
});

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
    }
    else {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}

function switchDarkMode() {
    // Toggles the dark mode, on/off
    

    chrome.storage.sync.get({ darkMode: null }, function(data) { 
        if(data.darkMode == null) {
            /*
            C'mon man, did you mess around with the storage?
            Just kidding, I love to mess around with things
            too. Keep it up! this is how I learned :)
            Anyways, I'm gonna set the key back to true.
            */
            chrome.storage.sync.set({ darkMode: true }, function() {
                console.log("darkMode key was not found in storage. Did you mess with things here?");
                document.body.classList.add("darkModeOn");
            });
        } else if(data.darkMode == true) {
            chrome.storage.sync.set({ darkMode: false}, function() {
                console.log("Dark Mode is off.");
              });
            document.body.classList.remove("darkModeOn");
        } else {
            chrome.storage.sync.set({ darkMode: true}, function() {
                console.log("Dark Mode is on.");
              });
            document.body.classList.add("darkModeOn");
        }
    });
}

// --------------------------------------------
// By default, dark mode is turned on.
chrome.storage.sync.get({ darkMode: null }, function(data) { 
    if(data.darkMode == null) {
        /* 
        No storage key named "darkMode".
        It probably means that this is the first time the extention
        is used on this device, so... lets create that key!
        */
        chrome.storage.sync.set({ darkMode: true }, function() {
            console.log("darkMode key was not found in storage. Created new key, set to true by default.");
            document.body.classList.add("darkModeOn");
        });
    } else if(data.darkMode == true) {
        // Dark mode is on in storage, so we need to turn off the lights.
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

window.onload = function () {
    var settingsButton = document.createElement("div");
    settingsButton.addEventListener("click", function () {
        window.open(chrome.extension.getURL("options/options.html"), "_blank");
    });
    settingsButton.className = "settingsButton";
    settingsButton.style.backgroundImage = "url('" + chrome.extension.getURL("images/settings.svg") + "')";
    document.body.appendChild(settingsButton);

    // --------------------------------------------
    /* Make a switch button to the dark mode,
     but only if the user wants me to! */
    chrome.storage.sync.get({ darkSwitch: true }, function(data) { 
        if(data.darkSwitch) {
            var darkSwitch = document.createElement("div");

            darkSwitch.setAttribute("class", "darkSwitch");
            darkSwitch.setAttribute("id", "darkSwitch");
            darkSwitch.style.backgroundImage = "url('" + chrome.extension.getURL("images/moon.svg") + "')";
            document.body.appendChild(darkSwitch);
            console.log("Dark Mode switch created");
            document.getElementById("darkSwitch").onclick = switchDarkMode;
        } else {
            console.log("Dark Mode switch is set to not appear.");
        }
    });
    // --------------------------------------------

    // --------------------------------------------
    // Resize large images
    var images = document.getElementsByClassName("tableborder")[0].getElementsByTagName("img");

    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        if (image.width > screen.width * 0.40781) {
            image.width = screen.width * 0.40781;
        }
    }
    // --------------------------------------------
    // --------------------------------------------
    // WYSIWYG


    chrome.storage.sync.get({ WYSIWYGCheckbox: true }, function(data) {
        if(data.WYSIWYGCheckbox) {
            var textarea = document.getElementsByName('Post')[0];
	        sceditor.create(textarea, {
	        	format: 'bbcode',
                icons: 'monocons',
            });

            document.body.addEventListener("keydown", function (e) {
                // Make the textarea focused when any of the keys listed using keyCodes are pressed
                const keyCodes = [13, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 66, 67, 68, 69 /* Nice ( ͡° ͜ʖ ͡° ) */, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 83, 85, 86, 88, 89, 90, 186, 188, 190, 191, 219, 221, 222];
                if (keyCodes.indexOf(e.keyCode) !=  -1) {
                    document.getElementById("WYSIWYGiframe").contentWindow.document.getElementById("wysiwygDivContent").focus();   
                }
            });
        }
    });
    

    // --------------------------------------------
    // --------------------------------------------
    /*
    Hide signatures larger than set in storage
    600 by default. Now, you see, I really wanted to make
    this relative, but... nah. After some testing, I found out
    that the Zoom level in the browser changes only sligtly
    the size of the element, so it is pretty much ignorable
    and does not worth the time of testing a relative thing.
    */
    chrome.storage.sync.get({ largeSignatures: 600 }, function(data) {
        if(data.largeSignatures > 0) { // Only hide if storage's value is positive
            const signatures = document.getElementsByClassName("signature");

            for (let i = 0; i < signatures.length; i++) {
                const signature = signatures[i];
                if (signature.clientHeight > data.largeSignatures) {
                    signature.innerHTML = "This signature was hidden by HPD as it is larger than allowed. You can change that in the extension's settings.";
                }
            }
        }
    });
    // --------------------------------------------
}
