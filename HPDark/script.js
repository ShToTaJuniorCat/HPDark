function getCookie(name) {
    // Returns value of cookie named {name}. Function from stackoverflow

    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
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

    if(getCookie("darkMode") == 1) {
        document.cookie = "darkMode=0";
        document.body.classList.remove("darkModeOn");
        console.log("Dark Mode is off.");
    } else {
        console.log("Dark Mode is on.");
        document.cookie = "darkMode=1";
        document.body.classList.add("darkModeOn");
    }
}

// --------------------------------------------
// By default, dark mode is turned on.
if(getCookie("darkMode") == null) {
    /* No cookie named "darkMode".
    It probably means that this is the first time the extention is used on this device,
    so... lets create that cookie!
    */
    document.cookie = "darkMode=1";
    document.body.classList.add("darkModeOn");
}

if(getCookie("darkMode") == 1) {
    // Dark mode is on, so lets turn it on, shall we?
    document.body.classList.add("darkModeOn");
}
// --------------------------------------------

window.onload = function () {
    // --------------------------------------------
    // Make a switch button to the dark mode
    var darkSwitch = document.createElement("div");

    darkSwitch.setAttribute("class", "darkSwitch");
    darkSwitch.setAttribute("id", "darkSwitch");
    document.body.appendChild(darkSwitch);
    console.log("Dark Mode switch created");
    document.getElementById("darkSwitch").onclick = switchDarkMode;
    // --------------------------------------------

    // --------------------------------------------
    // Resize large images
    var images = document.getElementsByTagName("img");

    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        if (image.width > screen.width * 0.40781) {
            image.width = screen.width * 0.40781;
        }
    }
    // --------------------------------------------


    var textarea = document.getElementsByName('Post')[0];
	sceditor.create(textarea, {
		format: 'bbcode',
        icons: 'monocons',
    });
    
    document.body.addEventListener("keydown", function (e) {
        const keyCodes = [13, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 66, 67, 68, 69 /* Nice ( ͡° ͜ʖ ͡° ) */, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 83, 85, 86, 88, 89, 90, 186, 188, 190, 191, 219, 221, 222];
        if (keyCodes.indexOf(e.keyCode) !=  -1) {
            document.getElementById("WYSIWYGiframe").contentWindow.document.getElementById("wysiwygDivContent").focus();   
        }
    });
}
