function getCookie(name) {
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

if(getCookie("darkMode") == null) {
    document.cookie = "darkMode=1";
    document.body.classList.add("darkModeOn");
}

if(getCookie("darkMode") == 1) {
    document.body.classList.add("darkModeOn");
}

window.onload = function () {
    var darkSwitch = document.createElement("div");
    darkSwitch.setAttribute("class", "darkSwitch");
    darkSwitch.setAttribute("id", "darkSwitch");
    document.body.appendChild(darkSwitch);
    console.log("Appended");
    document.getElementById("darkSwitch").onclick = switchDarkMode;
}

function switchDarkMode() {
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