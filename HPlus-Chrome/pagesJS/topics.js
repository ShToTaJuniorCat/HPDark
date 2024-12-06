$(window).on('load', function() {
    // --------------------------------------------
    // Resize large images
    // Update: upon inspection this doesn't appear to be doing anything since HPortal does this automatically.
    // Hidden for this reason. If I find HPortal's feature is acting up again, I'll bring this back.
    /*
    chrome.storage.sync.get({ resizeLargeImages: true, largeImages: 40.781 }, function(data) {
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
    chrome.storage.sync.get({ replaceSpotifyLinks: false }, function(data) {
        if(data.replaceSpotifyLinks) { // Only replace if storage's value is positive
            const $posts = $('.post1');

            $posts.each(function() {
                const $postLinks = $(this).find('a');
                
                $postLinks.each(function() {
                    const $link = $(this);
                    const href = $link.attr('href');

                    if (href.indexOf('spotify') !== -1 && href.split('track/').length > 1) {
                        const trackId = href.split('track/')[1].split('?')[0];
                        const iframe = `
                            <iframe style="border-radius:12px" 
                                    src="https://open.spotify.com/embed/track/${trackId}" 
                                    width="50%" height="150px" 
                                    frameborder="0" allowfullscreen 
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                    loading="lazy">
                            </iframe>`;
                        $link.html(iframe);
                    }
                });
            });
        }
    });
    // --------------------------------------------

    
    // --------------------------------------------
    /*
    Hide signatures larger than set in storage, 600 by
    default. Now, you see, I really wanted to make this
    relative, but... nah. After some testing, I found out
    that the zoom level in the browser only sligtly changes
    the size of the element, so it is pretty much ignorable
    and does not worth the time of testing a relative thing.
    If you have done testing, please reach out to me.
    */
    chrome.storage.sync.get({ hideLargeSig: true, largeSignatures: 600 }, function(data) {
        if(data.hideLargeSig) { // Only hide if storage's value is positive
            const $signatures = $('.signature');
            
            $signatures.each(function() {
                const $signature = $(this);
                if ($signature.height() > data.largeSignatures) {
                    $signature.html(`
                        חתימה זו הוסתרה על ידי HPlus כיוון שהיא גדולה מהמותר. 
                        ביכולתך לשנות הגדרה זו 
                        <a href="${chrome.runtime.getURL('options/options.html')}" target="_blank">בהגדרות התוסף</a>.
                    `);                    
                }
            });            
        }
    });
    // --------------------------------------------

    // --------------------------------------------
    // Set comment's text size according to preferences
    chrome.storage.sync.get({ textSize: 9 }, function(data) {
        $(".postcolor").css("font-size", data.textSize + "pt");
    });
    // --------------------------------------------
});