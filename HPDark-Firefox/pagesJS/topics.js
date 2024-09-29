$( document ).ready(function() {
    // --------------------------------------------
    // Resize large images
    // Update: upon inspection this doesn't appear to be doing anything since HPortal does this automatically.
    // Hidden for this reason. If I find HPortal's feature is acting up again, I'll bring this back.
    /*
    browser.storage.sync.get({ resizeLargeImages: true, largeImages: 40.781 }, function(data) {
        if(data.resizeLargeImages) {
            var images = $(".tableborder")[0].getElementsByTagName("img");

            for (let index = 0; index < images.length; index++) {
                const image = images[index];
                if (image.width > screen.width * data.largeImages / 100) {
                    image.width = screen.width * data.largeImages / 100;
                }
            }
        }
    }); */
    // --------------------------------------------

    // --------------------------------------------
    /*
    Replace links to Spotify tracks with embeds to the tracks
    */
    browser.storage.sync.get({ replaceSpotifyLinks: false }, function(data) {
        if(data.replaceSpotifyLinks) { // Only replace if storage's value is positive
            console.log("Replacing spotify shit");

            let posts = document.getElementsByClassName("post1");
            for(let i = 0; i < posts.length; i++) { 
                let postLinks = posts[i].getElementsByTagName("a");
                for(let j = 0; j < postLinks.length; j++) {
                    if (postLinks[j].href.indexOf("spotify") != -1 && postLinks[j].href.split('track/').length > 1) {
                        postLinks[j].innerHTML = '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/' + postLinks[j].href.split('track/')[1].split("?")[0] + '" width="50%" height="150px" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>';
                    }
                }
            }
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
    browser.storage.sync.get({ hideLargeSig: true, largeSignatures: 600 }, function(data) {
        if(data.hideLargeSig) { // Only hide if storage's value is positive
            const signatures = document.getElementsByClassName("signature");

            for (let i = 0; i < signatures.length; i++) {
                const signature = signatures[i];
                if (signature.clientHeight > data.largeSignatures) {
                    signature.innerHTML = "This signature was hidden by HPD as it is larger than allowed. You can change this in the <a href=\"" + browser.extension.getURL("options/options.html") + "\" target='_blank'>extension's settings</a>";
                }
            }
        }
    });
    // --------------------------------------------

    // --------------------------------------------
    // Set comment's text size according to preferences
    browser.storage.sync.get({ textSize: 9 }, function(data) {
        $(".postcolor").css("font-size", data.textSize + "pt");
    });
    // --------------------------------------------
});