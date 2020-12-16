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


    /*
    var wysiwygDiv = document.createElement("DIV");
    wysiwygDiv.setAttribute("id", "wysiwygDiv");
    wysiwygDiv.innerHTML = '<form action="" method="post">\n    <div>\n        <textarea id="example" style="height:300px;width:600px;"></textarea>\n    </div>\n</form>';
    document.body.appendChild(wysiwygDiv);
    */


    var textarea = document.getElementsByName('Post')[0];
	sceditor.create(textarea, {
		format: 'bbcode',
        icons: 'monocons',
	});
}
