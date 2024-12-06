const urlSearch = new URLSearchParams(window.location.search);

if(urlSearch.get("savedOwl")) {
    // Find requested owl ID
    const owlID = urlSearch.get('MSID');

    if(owlID) {
        // Fetch the owl from IndexedDB and set it's value in the textarea
        chrome.runtime.sendMessage({ action: "get_owl", owlID: owlID }, (response) => {
            if (chrome.runtime.lastError) {
                document.getElementById("Post").value = 'Failed to fetch owl: ' + chrome.runtime.lastError.message;
            } else {
                if(response.reply) {
                    const owl = response.reply;
                    document.getElementsByName("msg_title")[0].value = owl.title;
                    document.getElementById("Post").value = "[QUOTE]" + owl.bbcode + "[/QUOTE]";
                } else {
                    document.getElementById("Post").value = "בקשה שגויה. וודא שה-ID שמור באמצעות HP+ או נסה שוב מאוחר יותר.";
                }
            }
        });
    }
}

// Set the save copy of sent owl checkbox to whatever it's set to
// This page affects saved replies, non-saved replies, forwards, new owls
// and basically anything that sends an owl. This way I catch 'em all.
// Yeah I'm lazy to do it better, suffer
chrome.storage.sync.get({ checkSaveSent: true }, function (items) {
    $('input[name="add_sent"]').prop('checked', items.checkSaveSent);
});