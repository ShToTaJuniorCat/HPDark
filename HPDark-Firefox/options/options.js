var colorList = {};

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
      $("#" + panelName).css("background-color", "lightgreen");
  });
}


// Restores select box and checkbox state using the preferences
// stored in browser.storage.
function restore_options() {
  browser.storage.sync.get({
    darkMode: true,
    
    hideLargeSig: true,
    largeSignatures: 600,

    textSize: 9,
    // resizeLargeImages: true,
    // largeImages: 40.781, Hidden for lack of need. See topics.js for explanation
    replaceSpotifyLinks: false,

    addEdited: false,
    colors: false,

    showSickles: true,

    banMeMillisec: 0,
    lockBan: false
  }, function(items) {
    $("#darkSwitch").prop('checked', items.darkMode);

    $("#hideLargeSig").prop('checked', items.hideLargeSig);
    $("#largeSigInput").val(items.largeSignatures);
    if(items.hideLargeSig) {
      $("#largeSigInput").css("display", "initial");
      $("#resetLargeSig").css("display", "initial");
    }

    $("#textSize").val(items.textSize);

    // Hidden for lack of need. See topics.js for explanation
    // $("#resizeLargeImages").prop('checked', items.resizeLargeImages);
    // $("#largeImgInput").val(items.largeImages);
    // if(items.resizeLargeImages) {
    //   $("#largeImgInput").css('display', 'initial');
    //   $("#resetLargeImg").css("display", "initial");
    // }
    
    $("#addEdited").prop('checked', items.addEdited);
    $("#replaceSpotifyLinks").prop('checked', items.replaceSpotifyLinks);

    $("#showSickles").prop('checked', items.showSickles);

    if((new Date()).getTime() < items.banMeMillisec) {
      // Yes, it will be pretty easy to remove the ban even if its locked. Self control is important, people.
      // But I challenge you to remove it without using that button :)
      // Aaand now without setting the date to a past time, too

      if(items.lockBan) {
        $("#banInfo").html("הבאן הנוכחי נעול.");
        $("#lockBanTD").css("display", "none");
        $("#banMeTD").css("display", "none");
      } else {
        document.getElementById("cancelBanButton").style.display = "initial";
        $("#banInfo").css("display", "none");

        document.getElementById("cancelBanButton").addEventListener("click", function () {
          if(confirm("את/ה בטוח/ה שאת/ה רוצה לבטל את הבאן?")) {
            browser.storage.sync.set({ banMeMillisec: 0 });
            $("#cancelBanButton").css("display", "none");
            $("#banInfo").html("הבאן בוטל, יש לטעון מחדש את העמוד.");
            $("#banInfo").css("display", "initial");
          }
        });
      }
    } else {
      browser.storage.sync.set({
        banMeMillisec: 0,
        lockBan: false });
    }

    // TODO: Check colors
  });
}

// Save options to browser storage
function save_options() {
  var darkSwitchCheckbox = document.getElementById("darkSwitch").checked;

  var hideLargeSig = document.getElementById("hideLargeSig").checked;
  var largeSignaturesInput = document.getElementById("largeSigInput").value;
  
  var textSize = $("#textSize").val();
  // var resizeLargeImages = document.getElementById("resizeLargeImages").checked;
  // var largeImagesInput = document.getElementById("largeImgInput").value; Hidden for lack of need. See topics.js for explanation
  var replaceSpotifyLinks = document.getElementById("replaceSpotifyLinks").checked;
  
  var addEdited = document.getElementById("addEdited").checked;

  var showSickles = document.getElementById("showSickles").checked;

  browser.storage.sync.get({ banMeMillisec: 0,
    lockBan: false }, function (items) {
      var banMillisec = Math.max(items.banMeMillisec, // It should be the max of the one in the storage and the one currently selected,
                                                //  to stop smartasses who would try to set the date to a past time
        new Date($("#banMeDate").val() + " " + $("#banMeTime").val()).getTime() || 0); // || is needed in case first val is NaN
      
        // || is needed to stop smartasses setting new unlocked ban
      var lockBan = document.getElementById("lockBan").checked || items.lockBan;

      console.log(banMillisec);

      browser.storage.sync.set({
        banMeMillisec: banMillisec,
        lockBan: lockBan });
    }
  );

  browser.storage.sync.set({
    darkMode: darkSwitchCheckbox,

    hideLargeSig: hideLargeSig,
    largeSignatures: largeSignaturesInput,

    textSize: textSize,
    // resizeLargeImages: resizeLargeImages,
    // largeImages: largeImagesInput, Hidden for lack of need. See topics.js for explanation
    replaceSpotifyLinks: replaceSpotifyLinks,
    
    addEdited: addEdited,
    colors: colorList,

    showSickles: showSickles
  }, function() {
    // Update status to let user know options were saved.
    var optionsSaved = document.getElementById('optionsSaved');
    optionsSaved.textContent = 'Options saved.';
    setTimeout(function() {
      optionsSaved.textContent = '';
    }, 2000);
  });
}

document.addEventListener('DOMContentLoaded', restore_options);


window.onload = function () {
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
    if(this.checked) {
        $("#largeSigInput").css("display", "initial");
        $("#resetLargeSig").css("display", "initial");
    } else {
        $("#largeSigInput").css("display", "none");
        $("#resetLargeSig").css("display", "none");
    }
  });

  $("#resetTextSize").on("click", function () {
    $("#textSize").val(9);
  });

  // Hidden for lack of need. See topics.js for explanation
  // $("#resizeLargeImages").change(function () {
  //   if(this.checked) {
  //       $("#largeImgInput").css("display", "initial");
  //       $("#resetLargeImg").css("display", "initial");
  //   } else {
  //       $("#largeImgInput").css("display", "none");
  //       $("#resetLargeImg").css("display", "none");
  //   }
  // });
  //
  // $("#resetLargeImg").on("click", function () {
  //   $("#largeImgInput").val(40.781);
  // });

  $("#resetLargeSig").on("click", function () {
    $("#largeSigInput").val(600);
  });

  $("#setColor").on("click", function () {
    $("#color404").css("display", "none");

    var elem = document.createElement("li");
    var newColor = document.getElementById("color").value;
    var translation = document.getElementById("translation").value;
    
    if(newColor != "" && translation != "") {
      elem.setAttribute("style", "color: " + newColor);
      elem.innerText = translation;
    
      document.getElementById("colorList").append(elem);

      colorList[newColor] = translation;
    } else {
      $("#color404").css("display", "block");
    }
  });

  $("#colorsInfo").mouseover(function () {
    $("#colorsDesc").css('display','block');
  });

  $("#colorsInfo").on("mouseout", function () {
    $("#colorsDesc").css('display','none');
  });

  $("#resetColors").on("click", function () {
    if (confirm("אתה בטוח שאתה רוצה להחזיר את רשימת הצבעים לברירת המחדל שלה?")) {
      browser.storage.sync.set({ colors: false });
      $("#colorList").html("");
    }
  });

  $("#lockBan").on("change", function () {
    if(document.getElementById("lockBan").checked == true) {
      document.getElementById("lockBan").checked = confirm("את/ה בטוח/ה שאת/ה רוצה לסמן באן זה כבלתי ניתן לביטול?");
    }
  });

  $("#saveOptions").on('click',
    save_options);
}