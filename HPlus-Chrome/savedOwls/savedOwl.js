// Function to get the 'owlID' parameter from the URL
function getOwlIDFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('owlID'); // Get the 'owlID' parameter
}

// Function to display the owl content in the specified divs
function displayOwl(owl) {
    document.getElementsByClassName("tableborder")[0].innerHTML = owl.html;
    document.getElementById("replyToMessageTop").href = "https://hportal.co.il/index.php?savedOwl=true&CODE=04&act=Msg&MID=" + owl.senderID + "&MSID=" + owl.id;
    document.getElementById("replyToMessageBottom").href = "https://hportal.co.il/index.php?savedOwl=true&CODE=04&act=Msg&MID=" + owl.senderID + "&MSID=" + owl.id;
}

// Main function to fetch and display the owl
function showOwl() {
    const owlID = getOwlIDFromURL();

    if (owlID) {
        chrome.runtime.sendMessage({ action: "get_owl", owlID: owlID }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error:", chrome.runtime.lastError.message);
            } else {
                displayOwl(response.reply);
            }
        });
    } else {
        console.error("No 'owlID' parameter found in the URL");
    }
}

showOwl();