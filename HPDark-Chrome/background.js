chrome.runtime.setUninstallURL("https://forms.gle/r2afqHqEr3P7cXoF7", () => {});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "sendNotif") {
            submit(request.title, request.body, request.icon);
        }
    }
);

function submit(notifTitle, notifMsg, notifIcon) {
    var options = {
        type: "basic",
        title: notifTitle,
        message: notifMsg,
        iconUrl: notifIcon
    };
    
    chrome.notifications.create(options, callback);
}

function callback() {
    console.log("Notification succesfull");
}
