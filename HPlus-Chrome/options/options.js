let localColorList = {};

// I hate new version JS. Why does everything have to load fast?
async function loadColors() {
  const response = await fetch('./colors/colors.json');
  if (!response.ok) {
    throw new Error('Failed to load JSON color data');
  }
  return response.json();
}

async function addColor() {
  // Hide the 'color not found' message
  $("#color404").hide();

  // Get color and its name
  const newColor = $('#color').val().toLowerCase();
  const colorName = $('#colorName').val();

  // Ensure the color exists and has a name
  if (newColor && colorName) {
    if (newColor in localColorList) {
      $("#liColor" + newColor).text(colorName);
      localColorList[newColor] = colorName;
    } else if (!Object.values(localColorList).includes(colorName) ||
      confirm("שם הצבע הזה כבר בשימוש. להשתמש בו שוב?")) {
      try {
        // Load colors from the JSON file 
        const data = Object.values((await loadColors())[0]).flat().map(item => item.toLowerCase());

        // Check if the color is in the JSON data
        if (data.includes(newColor)) {
          // Create a new <li> element to display the color
          const $elem = $('<li>', {
            text: colorName,
            css: { color: newColor },
            id: 'liColor' + newColor
          });

          $('#colorList').append($elem);

          // Save the color and its name for later use
          localColorList[newColor] = colorName;
        } else {
          $("#color404").text("הצבע אינו קיים (מומלץ לבדוק איות)").show();
        }
      } catch (error) {
        $("#color404").text("אירעה תקלה. נא לנסות שוב. אם הבעיה ממשיכה, נא ליצור קשר איתי (המפתח)").show();
      }
    }
  } else {
    // No color set, inform the user
    $("#color404").text("צבע או שם צבע לא מוגדר").show();
  }
}

function hideAllOptions() {
  // Hide all options elements from displaying. 
  // We only want one options element at a time
  $(".options").hide();
}

function removeHighlights() {
  // Remove highlight from all panel.
  // Only selected panel should be highlighted 
  $(".panel").css("background-color", "grey");
}

function setPanelReady(panelName, options) {
  $("#" + panelName).on("click", function () {
    hideAllOptions();
    removeHighlights();
    $("#" + options).show();
    $(this).css("background-color", "lightgreen");
  });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    darkMode: true,

    hideLargeSig: true,
    largeSignatures: 600,

    textSize: 9,
    // resizeLargeImages: true,
    // largeImages: 40.781, Hidden for lack of need. See topics.js for explanation
    replaceSpotifyLinks: false,

    addEdited: false,
    colors: {},
    addStrikethrough: true,
    addQuote: false,
    addHTML: false,
    addSQL: false,

    showSickles: true,

    banMeMillisec: 0,
    lockBan: false,

    checkSaveSent: true,

    owlsWarningInput: 5,
    owlsSinceExport: 0,
    owleryCapacityQuota: 95,
    saveOldestOwl: true,
    deleteOldestOwl: false,
    maxOwleryStorage: 300,
    displayDuplicateOwls: false,
    displaySavedOwls: true
  }, function (items) {
    $("#darkSwitch").prop('checked', items.darkMode);

    $("#textSize").val(items.textSize);

    $("#hideLargeSig").prop('checked', items.hideLargeSig);
    $("#largeSigInput").val(items.largeSignatures);
    if (items.hideLargeSig) {
      $("#largeSigInput").css("display", "initial");
      $("#resetLargeSig").css("display", "initial");
    }

    $("#replaceSpotifyLinks").prop('checked', items.replaceSpotifyLinks);

    // Hidden for lack of need. See topics.js for explanation
    // $("#resizeLargeImages").prop('checked', items.resizeLargeImages);
    // $("#largeImgInput").val(items.largeImages);
    // if(items.resizeLargeImages) {
    //   $("#largeImgInput").css('display', 'initial');
    //   $("#resetLargeImg").css("display", "initial");
    // }

    $("#addEdited").prop('checked', items.addEdited);

    colorList = items.colors;
    colorCodes = Object.keys(colorList);
    for (let i = 0; i < colorCodes.length; i++) {
      // Create a list item with color=color's value, id=liColor{color's value} (consistent with later use)
      const $listItem = $('<li>', {
        css: { color: colorCodes[i] },
        id: 'liColor' + colorCodes[i],
        text: colorList[colorCodes[i]]
      });

      $('#colorList').append($listItem);
    }
    localColorList = colorList;

    $("#addStrikethrough").prop('checked', items.addStrikethrough);
    $("#addQuote").prop('checked', items.addQuote);
    $("#addHTML").prop('checked', items.addHTML);
    $("#addSQL").prop('checked', items.addSQL);

    $("#showSickles").prop('checked', items.showSickles);

    if ((new Date()).getTime() < items.banMeMillisec) {
      // Yes, it is pretty easy to remove the ban even if its locked.
      // Self control is important, people.
      // But I challenge you to remove it without using that button :)

      if (items.lockBan) {
        $("#banInfo").html("הבאן הנוכחי נעול.");
        $("#lockBanTD, #banMeTD").hide();
      } else {
        $("#banMeDate").val("");
        $("#cancelBanButton").css("display", "initial");
        $("#banInfo").hide();

        $("#cancelBanButton").on("click", async function () {
          if (confirm("את/ה בטוח/ה שאת/ה רוצה לבטל את הבאן?")) {
            await chrome.storage.sync.set({ banMeMillisec: 0 });
            $("#banMeDate").val("");
            $("#cancelBanButton").hide();
            $("#banInfo").html("הבאן בוטל, יש לטעון מחדש את העמוד.").show();
          }
        });
      }
    } else {
      $("#banMeDate").val("");
      chrome.storage.sync.set({
        banMeMillisec: 0,
        lockBan: false
      });
    }
    
    if(items.owlsSinceExport >= items.owlsWarningInput) {
      $("#owlsOverflowWarning").text(`${items.owlsSinceExport} ינשופים נשמרו מאז הייצוא האחרון!`)
      $("#owlsOverflowWarning").show();
    }

    $("#owlsWarningInput").val(items.owlsWarningInput);
    $("#owleryCapacityQuota").val(items.owleryCapacityQuota);
    $("#checkSaveSent").prop('checked', items.checkSaveSent);
    $("#checkDeleteOldestOwl").prop('checked', items.deleteOldestOwl);
    $("#saveOldestOwl").prop('checked', items.saveOldestOwl);
    $("#maxOwleryStorage").val(items.maxOwleryStorage);
    $("#displayDuplicateOwls").prop('checked', items.displayDuplicateOwls);
    $("#displaySavedOwls").prop('checked', items.displaySavedOwls);
  });
}

// Save options to chrome storage
function save_options() {
  const darkSwitchCheckbox = $("#darkSwitch").is(":checked");

  const hideLargeSig = $("#hideLargeSig").is(":checked");
  const largeSignaturesInput = $("#largeSigInput").val();

  const textSize = $("#textSize").val();
  // const resizeLargeImages = $("#resizeLargeImages").is(":checked");
  // const largeImagesInput = $("#largeImgInput").val(); Hidden for lack of need. See topics.js for explanation
  const replaceSpotifyLinks = $("#replaceSpotifyLinks").is(":checked");

  const addEdited = $("#addEdited").is(":checked");
  const addStrikethrough = $("#addStrikethrough").is(":checked");
  const addQuote = $("#addQuote").is(":checked");
  const addHTML = $("#addHTML").is(":checked");
  const addSQL = $("#addSQL").is(":checked");

  const showSickles = $("#showSickles").is(":checked");

  chrome.storage.sync.get({
    banMeMillisec: 0,
    lockBan: false
  }, function (items) {
    const banMillisec = Math.max(items.banMeMillisec, // It should be the max of the one in the storage and the one currently selected,
      //  to stop smartasses who would try to set the date to a past time
      new Date($("#banMeDate").val() + " " + $("#banMeTime").val()).getTime() || 0); // || is needed in case first val is NaN

    // || is needed to stop smartasses setting new unlocked ban
    const lockBan = $('#lockBan').is(':checked') || items.lockBan;

    chrome.storage.sync.set({
      banMeMillisec: banMillisec,
      lockBan: lockBan
    });
  });

  const owlsWarningInput = $("#owlsWarningInput").val();
  const owleryCapacityQuota = $("#owleryCapacityQuota").val();
  const checkSaveSent = $("#checkSaveSent").is(":checked");
  const checkDeleteOldestOwl = $("#checkDeleteOldestOwl").is(":checked");
  const saveOldestOwl = $("#saveOldestOwl").is(":checked");
  const maxOwleryStorage = $("#maxOwleryStorage").val();
  const displayDuplicateOwls = $("#displayDuplicateOwls").is(":checked");
  const displaySavedOwls = $("#displaySavedOwls").is(":checked");

  chrome.storage.sync.set({
    darkMode: darkSwitchCheckbox,

    hideLargeSig: hideLargeSig,
    largeSignatures: largeSignaturesInput,

    textSize: textSize,
    // resizeLargeImages: resizeLargeImages,
    // largeImages: largeImagesInput, Hidden for lack of need. See topics.js for explanation
    replaceSpotifyLinks: replaceSpotifyLinks,

    addEdited: addEdited,
    colors: localColorList,
    addStrikethrough: addStrikethrough,
    addQuote: addQuote,
    addHTML: addHTML,
    addSQL: addSQL,

    showSickles: showSickles,

    owlsWarningInput: owlsWarningInput,
    checkSaveSent: checkSaveSent,
    owleryCapacityQuota: owleryCapacityQuota,
    saveOldestOwl: saveOldestOwl,
    deleteOldestOwl: checkDeleteOldestOwl,
    maxOwleryStorage: maxOwleryStorage,
    displayDuplicateOwls: displayDuplicateOwls,
    displaySavedOwls: displaySavedOwls
  }, function () {
    // Update status to let the user know options were saved.
    let $optionsSaved = $('#saveOptions');
    $optionsSaved.text('שינויים נשמרו.');
    $optionsSaved.prop("disabled", true)

    setTimeout(function () {
      $optionsSaved.text('שמור שינויים');
      $optionsSaved.prop("disabled", false)
    }, 2000);
  });
}

$(document).ready(restore_options);

$(function () {
  // Set all panels ready to be clicked and used
  setPanelReady("darkModePanel", "darkModeOptions");
  setPanelReady("commentsPanel", "commentsOptions");
  setPanelReady("writeCommentPanel", "writeCommentOptions");
  setPanelReady("userProfilePanel", "userProfileOptions");
  setPanelReady("userSettingsPanel", "userSettingsOptions");
  setPanelReady("owlsSettingsPanel", "owlsSettingsOptions");

  // Set dark mode panel selected when opening the page
  hideAllOptions();
  removeHighlights();
  $("#darkModeOptions").show();
  $("#darkModePanel").css("background-color", "lightgreen");

  $("#hideLargeSig").change(function () {
    $("#largeSigInput, #resetLargeSig").css("display", this.checked ? "initial" : "none");
  });

  $("#resetTextSize").on("click", function () {
    $("#textSize").val(9);
  });

  $("#resetLargeSig").on("click", function () {
    $("#largeSigInput").val(600);
  });

  $("#quoteInfo").on("click", function () {
    $("#quoteDesc").toggle();
  });

  $("#setColor").on("click", addColor);

  $("#colorsInfo").on("click", function () {
    $("#colorsDesc").toggle();
  });

  $("#resetColors").on("click", function () {
    // Reset color list
    if (confirm("אתה בטוח שאתה רוצה להחזיר את רשימת הצבעים לברירת המחדל שלה?")) {
      chrome.storage.sync.set({ colors: {} });
      localColorList = {};
      $("#colorList").empty();
    }
  });

  $("#lockBan").on("change", function () {
    if (this.checked) {
      const isConfirmed = confirm("את/ה בטוח/ה שאת/ה רוצה לסמן באן זה כבלתי ניתן לביטול?");
      $(this).prop('checked', isConfirmed);
    }
  });

  $('#importOwlsButton').on('click', function () {
    $('#importOwlsFile').click(); // Trigger file input click when import button is clicked
  });

  $('#importOwlsFile').on('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const importedData = JSON.parse(e.target.result);
          chrome.runtime.sendMessage({ action: "import_owls", owls: importedData }, async (reply) => {
            if (chrome.runtime.lastError || reply.error) {
              $("#owl-action-status").text((reply.error || chrome.runtime.lastError.message) + " אם זה ממשיך לקרות, אנא צרו איתי קשר.");
              console.error("Error:", (reply.error || chrome.runtime.lastError.message));
            } else {
              console.log(reply.reply);

              $("#exportOwlsButton, #saveAllOwlsButton, #deleteAllSavedOwlsButton, #deleteOwlsWithCopyButton")
                .prop('disabled', true)
                .text('לא זמין');

              $("#importOwlsButton")
                .prop("disabled", true);

              $("#owl-action-status, #importOwlsButton")
                .text("ינשופים יובאו בהצלחה!");
            }
          });
        } catch(error) {
          $("#owl-action-status").text("לא ניתן לייבא ינשופים, הקובץ אינו מתאים.");
          console.error("Error:", error);
        }
      };
      reader.readAsText(file); // Read the file as text
    }
  });

  $("#saveAllOwlsButton").click(saveAllOwls);

  // Handle button that deletes all saved owls
  $("#deleteAllSavedOwlsButton").click(function () {
    if(prompt("למחוק את כל הינשופים השמורים? הקלד/י \"מחק הכל\" (ללא גרשיים) בכדי לאשר.") == "מחק הכל") {
      chrome.runtime.sendMessage({ action: "delete_all_saved_owls" }, (reply) => {
        if (reply.error) {
          console.log("Error for owl " + owlID + ": ", reply);
        } else {
          console.log(reply.reply);
          $("#exportOwlsButton, #importOwlsButton, #saveAllOwlsButton, #deleteOwlsWithCopyButton")
            .prop('disabled', true)
            .text('לא זמין');

          $("#deleteAllSavedOwlsButton")
            .prop('disabled', true);

          $("#owl-action-status, #deleteAllSavedOwlsButton")
            .text("כל הינשופים השמורים נמחקו.");
        }
      });
    }
  });

  // Handle button that deletes all owls with saved copy
  $("#deleteOwlsWithCopyButton").click(function () {
    if(prompt("למחוק את כל הינשופים שיש להם עותק שמור? הקלד/י \"מחק ינשופים עם עותק\" (ללא גרשיים) בכדי לאשר.") == "מחק ינשופים עם עותק") {
      chrome.runtime.sendMessage({ action: "delete_owl_with_copy" }, (reply) => {
        if (reply.error) {
          $("#owl-action-status").text("Error: " + reply);
          console.log("Error: ", reply);
        } else {
          console.log(reply.reply);
          $("#owl-action-status, #deleteOwlsWithCopyButton")
            .text("כל הינשופים עם עותק שמור נמחקו.");
          
          $("#deleteOwlsWithCopyButton").prop('disabled', true);

          $("#exportOwlsButton, #importOwlsButton, #saveAllOwlsButton, #deleteAllSavedOwlsButton")
            .prop('disabled', true)
            .text('לא זמין');
        }
      });
    }
  });
});

$(document).on('click', "#saveOptions",
  save_options);

$(document).on('click', '#colorList li', function () {
  // Note to self: Tried using the jQuery way, which is
  // $(this).css('color')
  // But it returns an RGB value of the color instead of client
  // color. So that's not in use now.
  delete localColorList[this.style.color];

  // Remove the color item in the list
  $(this).remove();
});

chrome.runtime.sendMessage({ action: "get_all_owls" }, async (response) => {
  if (chrome.runtime.lastError) {
    console.error("Error:", chrome.runtime.lastError.message);
  } else {
    // Download all owls as a JSON file
    $('#exportOwlsButton').on('click', function () {
      const allOwls = response.reply;

      // Create a blob with the JSON data
      const blob = new Blob([JSON.stringify(allOwls, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      // Create a temporary <a> element to trigger the download
      const tempLink = $('<a>')
        .attr('href', url)
        .attr('download', 'owls_backup.json');

      // Trigger the download
      tempLink[0].click();

      // Clean up the URL object and remove the link
      URL.revokeObjectURL(url);
      tempLink.remove();

      $("#owl-action-status").text("ינשופים יוצאו");

      chrome.storage.sync.set({ owlsSinceExport: 0 });
    });
  }
});

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

function saveOwl(owlID) {
  return new Promise(async (resolve, reject) => {
    const bbcode = await getBBCodeContent(owlID);
    const htmlContent = await getHTMLContent(owlID);

    chrome.runtime.sendMessage({ action: "save_owl", owlID: owlID, bbcode: bbcode, htmlContent: htmlContent }, (response) => {
        if (response.error || chrome.runtime.lastError) {
        reject((response.error || chrome.runtime.lastError));
      } else {
        resolve(response.reply);
      }
    });
  });
}

async function saveAllOwls() {
  const baseURL = "https://hportal.co.il/index.php?act=Msg&CODE=1&st=";
  let foundOwls = true;
  let currentPage = 0;

  // This will be the total number of owls we're trying to save
  let totalOwls = 0;
  // This is how many owls were successfully saved
  let successOwls = 0;
  // This is how many owls are a disappointment to their family
  let failedOwls = 0;

  // Don't save multiple times, silly
  $("#saveAllOwlsButton").prop('disabled', true);

  // The DB needs a refresh to update
  // So force them to refresh before exporting/importing
  $("#exportOwlsButton, #importOwlsButton, #deleteAllSavedOwlsButton, #deleteOwlsWithCopyButton")
    .prop('disabled', true)
    .text('לא זמין');

  while (foundOwls) {
    $("#owl-action-status").text(`צד ינשופים... (עמוד ${currentPage})`);

    await fetch(baseURL + (currentPage * 100))
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Parse the response as text
      })
      .then(async html => {
        console.log("Fetching for " + (currentPage * 100));

        // Get first <a> in each tr.dlight, which are the links to each owl
        const owls = $($.parseHTML(html)).find("tr.dlight");
        if (owls.length > 0) {
          totalOwls += owls.length;

          // Extract all owl MSIDs into an array
          const owlIDs = owls.find("a:first").map(function () {
            return new URLSearchParams($(this).attr('href')).get("MSID");
          }).get();

          // Save owls one by one with a delay
          for (const owlID of owlIDs) {
            try {
              await saveOwl(owlID);
              successOwls++;

              if (successOwls === totalOwls) {
                $("#owl-action-status")
                  .text(`ינשופים ☑: ✓ ${successOwls}/${totalOwls}`)
                  .css("color", "green");
              } else if (successOwls + failedOwls === totalOwls) {
                $("#owl-action-status")
                  .text(`☑: (✓ ${successOwls}, ✗ ${failedOwls})/${totalOwls}`)
                  .css("color", "#ff5555");
              } else {
                $("#owl-action-status")
                  .text(`(✓ ${successOwls}, ✗ ${failedOwls})/${totalOwls}`);
              }
            } catch (error) {
              failedOwls++;
              console.log("Failed to save owl: " + error);

              if (successOwls + failedOwls === totalOwls) {
                $("#owl-action-status")
                  .text(`☑: (✓ ${successOwls}, ✗ ${failedOwls})/${totalOwls}`)
                  .css("color", "#ff5555");
              } else {
                $("#owl-action-status")
                  .text(`(✓ ${successOwls}, ✗ ${failedOwls})/${totalOwls}`);
              }
            }

            // Wait for 500ms before the next request
            // Chrome doesn't like it when we spam the requests
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        } else {
          foundOwls = false;
        }
      })
      .catch(error => {
        console.error('Error fetching owls:', error);
      });

    currentPage++;
  }
}
