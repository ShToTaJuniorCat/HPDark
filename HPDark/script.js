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

/*
Used to develop WYSIWYG

function BBCodeToHTML($str) {
    // Converts BBCode to HTML using regex. Function from stackoverflow

    // The array of regex patterns to look for
    $format_search =  [
        /\[b\](.*?)\[\/b\]/ig,
        /\[i\](.*?)\[\/i\]/ig,
        /\[u\](.*?)\[\/u\]/ig
    ]; // note: NO comma after the last entry

    // The matching array of strings to replace matches with
    $format_replace = [
        '<strong>$1</strong>',
        '<em>$1</em>',
        '<span style="text-decoration: underline;">$1</span>'
    ];

    // Perform the actual conversion
    for (var i =0;i<$format_search.length;i++) {
      $str = $str.replace($format_search[i], $format_replace[i]);
    }
    return $str;
}

function showComment() {
    

    document.getElementById("finalComment").innerHTML = BBCodeToHTML(textarea.value);
}
*/

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
}
