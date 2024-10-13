/*
This page WILL need an update after an upgrade.
Since almost NOTHING has an ID or unique class,
I am selecting value using attributes and parent,
which will change if HPortal ever has an upgrade.
@Peleg - I mean, @me - keep in mind.
*/

// --------------------------------------------
// Make a button to send sickles from the profile of someone
browser.storage.sync.get({ showSickles: true }, function(data) {
    if(data.showSickles) {
        const username = $("h3").text();

        $("img[src='style_images/profile/send_pm_small.png']")
            .parent() // Select the parent of the PM button and appent to it
            .append(`
                <img src="${browser.extension.getURL('images/Coins.png')}" width="20" />
                &nbsp;<a href="https://hportal.co.il/index.php?act=store&CODE=donate_money&username=${encodeURIComponent(username)}">שלח חרמשים</a>
            `); // So, apparently, any info passed through the link in hportal.co.il which is not [A-Z] or [a-z] or URL components is encoded with an encoding method I couldnt figure out,
                // so I'm encoding it myself using a simple encoding method of JS (escape) and decoding it at the destionation (donate.js).
    }
}); 
// --------------------------------------------