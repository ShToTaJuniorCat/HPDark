/*
This page WILL need an update after an upgrade.
Since almost NOTHING has an ID or unique class,
I am selecting value using attributes and parent,
Which will change if HPortal ever has an upgrade.
Peleg, keep in mind.
*/

// --------------------------------------------
// Make a button to send sickles from the profile of someone
chrome.storage.sync.get({ showSickles: true }, function(data) {
    if(data.showSickles) {
        let username = $("h3").text();

        $("img[src='style_images/profile/send_pm_small.png']").parent().append( // Select the parent of the PM button and appent to it
        "<img src='" + chrome.extension.getURL("images/Coins.png") + "' width='20'/>&nbsp;<a href='https://hportal.co.il/index.php?act=store&CODE=donate_money&username=" + 
        escape(username) // So, apparently, any info passed through the link in hportal.co.il which is not [A-Z] or [a-z] or URL components is encoded with an encoding method I couldnt figure out, so I'm encoding it myself using a simple encoding method of JS (escape) and decoding it at the destionation (donate.js).
        + "'>שלח חרמשים</a>");
    }
}); 
// --------------------------------------------