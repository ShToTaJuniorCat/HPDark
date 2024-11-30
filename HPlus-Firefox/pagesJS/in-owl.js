function updateState(state) {
    const image = $("#saveOwlImage");
    image.attr("src", browser.runtime.getURL(`images/${state}-owl.png`));
    image.attr("width", 45);    
}

const bar = $("td.darkrow3 div[align=left]");
const image = $("<img>")
    .attr("src", browser.runtime.getURL("images/save-owl.png"))
    .attr("id", "saveOwlImage")
    .attr("height", 20)
    .on("click", function () {
        const owlID = new URLSearchParams(window.location.search).get("MSID");

        browser.runtime.sendMessage({ action: "save_owl", owlID: owlID }, (response) => {
            if (response.error || browser.runtime.lastError) {
                console.error("Error:", (response.error || browser.runtime.lastError));
                updateState("error-saving");
            } else {
                console.log("Success! Response: ", response.reply);
                updateState("saved");
            }
        });

        updateState("saving");
    });

bar.append(image);
