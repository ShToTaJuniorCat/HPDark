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
    lockBan: false
  }, function(items) {
    $("#darkSwitch").prop('checked', items.darkMode);

    $("#textSize").val(items.textSize);

    $("#hideLargeSig").prop('checked', items.hideLargeSig);
    $("#largeSigInput").val(items.largeSignatures);
    if(items.hideLargeSig) {
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
    for(let i = 0; i < colorCodes.length; i++) {
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

    if((new Date()).getTime() < items.banMeMillisec) {
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
        lockBan: false });
    }
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

  chrome.storage.sync.get({ banMeMillisec: 0,
    lockBan: false }, function (items) {
      const banMillisec = Math.max(items.banMeMillisec, // It should be the max of the one in the storage and the one currently selected,
                                                //  to stop smartasses who would try to set the date to a past time
        new Date($("#banMeDate").val() + " " + $("#banMeTime").val()).getTime() || 0); // || is needed in case first val is NaN
      
        // || is needed to stop smartasses setting new unlocked ban
      const lockBan = $('#lockBan').is(':checked') || items.lockBan;

      chrome.storage.sync.set({
        banMeMillisec: banMillisec,
        lockBan: lockBan });
    }
  );

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

    showSickles: showSickles
  }, function() {
    // Update status to let the user know options were saved.
    let $optionsSaved = $('#optionsSaved');
    $optionsSaved.text('Options saved.');
    
    setTimeout(function() {
        $optionsSaved.text('');
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

  $("#quoteInfo").on("click", function() {
    $("#quoteDesc").toggle();
  });

  $("#setColor").on("click", addColor);

  $("#colorsInfo").on("click", function() {
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
});

$(document).on('click', "#saveOptions",
  save_options);

$(document).on('click', '#colorList li', function() {
  // Note to self: Tried using the jQuery way, which is
  // $(this).css('color')
  // But it returns an RGB value of the color instead of client
  // color. So that's not in use now.
  delete localColorList[this.style.color];

  // Remove the color item in the list
  $(this).remove();
});