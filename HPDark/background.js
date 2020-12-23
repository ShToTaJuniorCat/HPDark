chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "getstorage"){
        var result = {one: "1"};
        chrome.storage.sync.get({
            darkMode: true
          }, function(items) {
            return items;
          });
        sendResponse(result);
    }
});