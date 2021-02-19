window.onload = function () {
    // --------------------------------------------
    // Resize large images
    chrome.storage.sync.get({ resizeLargeImages: true, largeImages: 40.781 }, function(data) {
        if(data.resizeLargeImages) {
            var images = document.getElementsByClassName("tableborder")[0].getElementsByTagName("img");

            for (let index = 0; index < images.length; index++) {
                const image = images[index];
                if (image.width > screen.width * data.largeImages / 100) {
                    image.width = screen.width * data.largeImages / 100;
                }
            }
        }
    });
    // --------------------------------------------
    

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
    /*
    Hide signatures larger than set in storage, 600 by
    default. Now, you see, I really wanted to make this
    relative, but... nah. After some testing, I found out
    that the Zoom level in the browser only sligtly changes
    the size of the element, so it is pretty much ignorable
    and does not worth the time of testing a relative thing.
    If you have done testing, please reach out to me.
    */
    chrome.storage.sync.get({ hideLargeSig: true, largeSignatures: 600 }, function(data) {
        if(data.hideLargeSig) { // Only hide if storage's value is positive
            const signatures = document.getElementsByClassName("signature");

            for (let i = 0; i < signatures.length; i++) {
                const signature = signatures[i];
                if (signature.clientHeight > data.largeSignatures) {
                    signature.innerHTML = "This signature was hidden by HPD as it is larger than allowed. You can change this in the <a href=\"" + chrome.extension.getURL("options/options.html") + "\" target='_blank'>extension's settings</a>";
                }
            }
        }
    });
    // --------------------------------------------
}