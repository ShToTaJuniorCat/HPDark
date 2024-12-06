function getBBCodeContent(owlID) {
    return fetch("https://hportal.co.il/index.php?CODE=04&act=Msg&MSID=" + owlID)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch BBCode');
            }
            return response.arrayBuffer(); // Fetch raw binary data
        })
        .then(buffer => {
            // Decode the response using the correct encoding
            const decoder = new TextDecoder('windows-1255'); // Adjust encoding to match the page
            const responseHTML = decoder.decode(buffer);

            const parser = new DOMParser();
            const doc = parser.parseFromString(responseHTML, 'text/html');
            const textarea = doc.querySelector('textarea#Post');
            if (!textarea || textarea.value === "") {
                throw new Error("Owl with ID " + owlID + " doesn't exist.");
            }

            // Slicing off the [QUOTE][/QUOTE] tags
            return textarea.value.slice(7, -9);
        });
}


function getHTMLContent(owlID) {
    return fetch("https://hportal.co.il/index.php?act=Msg&CODE=03&MSID=" + owlID)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch HTML content');
            }
            return response.arrayBuffer(); // Fetch raw binary data
        })
        .then(buffer => {
            // Decode the response using the correct encoding
            const decoder = new TextDecoder('windows-1255'); // Adjust encoding if needed
            const responseHTML = decoder.decode(buffer);

            const parser = new DOMParser();
            const doc = parser.parseFromString(responseHTML, 'text/html');

            // Extract owl details
            const owlDetails = doc.querySelector(".postdetails");
            if (!owlDetails) {
                throw new Error("Failed to locate owl details in the response.");
            }

            const userAElement = doc.querySelector("span.normalname a");
            if (!userAElement) {
                throw new Error("Failed to locate sender details in the response.");
            }
            const senderID = userAElement.href.split("=")[1];
            const senderName = userAElement.textContent;

            const title = owlDetails.firstChild.textContent.trim();
            const time = owlDetails.childNodes[1].textContent.replace(/^,\s*/, '');
            const owlHTML = doc.querySelector('div.tableborder').innerHTML;

            return {
                senderID: senderID,
                senderName: senderName,
                title: title,
                time: time,
                htmlContent: owlHTML
            };
        });
}

function updateState(state) {
    const image = $("#saveOwlImage");
    image.attr("src", chrome.runtime.getURL(`images/${state}-owl.png`));
    image.attr("width", 45);    
}

const bar = $("td.darkrow3 div[align=left]");
const image = $("<img>")
    .attr("src", chrome.runtime.getURL("images/save-owl.png"))
    .attr("id", "saveOwlImage")
    .attr("height", 20)
    .on("click", async function () {
        updateState("saving");
        
        const owlID = new URLSearchParams(window.location.search).get("MSID");
        const bbcode = await getBBCodeContent(owlID);
        const htmlContent = await getHTMLContent(owlID);

        chrome.runtime.sendMessage({ action: "save_owl", owlID: owlID, bbcode: bbcode, htmlContent: htmlContent }, (response) => {
            if (response.error || chrome.runtime.lastError) {
                console.error("Error:", (response.error));
                updateState("error-saving");
            } else {
                console.log("Success! Response: ", response.reply);
                updateState("saved");
            }
        });
    });

bar.append(image);
