window.onload = function () {
    // --------------------------------------------
    // Add "edited by" line by default
    chrome.storage.sync.get({ addEdited: false }, function(data) { 
        document.getElementsByName("add_edit")[0].checked = data.addEdited;
    });
    //---------------------------------------------

    // --------------------------------------------
    // WYSIWYG
    chrome.storage.sync.get({ WYSIWYGCheckbox: false }, function(data) {
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
    // Customise color in color selection GUI
    chrome.storage.sync.get({ colors: false }, function(data) {
        // Check if the colors are set (default is false, therefore not set)
        if(data.colors != false && typeof(data.colors) == "object" && !jQuery.isEmptyObject(data.colors)) {
            var colorNames = Object.keys(data.colors);

            var fcolor = document.getElementsByName("fcolor")[0];

            for(var i = fcolor.childElementCount; i > 1; i--) {
                fcolor.removeChild(fcolor.children[i - 1]);
            }

            var option;
            for(var i = 0; i < colorNames.length; i++) {
                option = document.createElement("option");
                option.setAttribute("value", colorNames[i]);
                option.setAttribute("style", "color: " + colorNames[i]);
                option.innerText = data.colors[colorNames[i]];    
                fcolor.append(option);
            }
        }
    });
    // --------------------------------------------
}