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
  document.getElementById(panelName).addEventListener("click", function () {
      hideAllOptions();
      removeHighlights();
      $("#" + options).show();
      $("#" + panelName).css("background-color", "lightgreen");
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    darkSwitch: true,
    
    hideLargeSig: true,
    largeSignatures: 600,

    resizeLargeImages: true,
    largeImages: 40.781,

    WYSIWYGCheckbox: false,

    addEdited: false,

    showSickles: true,

    banMeMillisec: 0,
    lockBan: false
  }, function(items) {
    document.getElementById("darkSwitch").checked = items.darkSwitch;

    document.getElementById("hideLargeSig").checked = items.hideLargeSig;
    document.getElementById("largeSigInput").value = items.largeSignatures;
    if(items.hideLargeSig) {
      document.getElementById("largeSigInput").style.display = "initial";
      document.getElementById("resetLargeSig").style.display = "initial";
    }

    document.getElementById("resizeLargeImages").checked = items.resizeLargeImages;
    document.getElementById("largeImgInput").value = items.largeImages;
    if(items.resizeLargeImages) {
      document.getElementById("largeImgInput").style.display = "initial";
      document.getElementById("resetLargeImg").style.display = "initial";
    }

    document.getElementById("WYSIWYGCheckbox").checked = items.WYSIWYGCheckbox;
    
    document.getElementById("addEdited").checked = items.addEdited;

    document.getElementById("showSickles").checked = items.showSickles;

    if((new Date()).getTime() < items.banMeMillisec) {
      document.getElementById("banInfo").style.display = "none";
      document.getElementById("cancelBan").style.display = (items.lockBan ? "none" : "initial");
      // Yes, it will be pretty easy to remove the ban even if its locked.
      // But I challenge you to remove it without using that button :)
    }
  });
}

// Save options to chrome.storage
function save_options() {
  var darkSwitchCheckbox = document.getElementById("darkSwitch").checked;

  var hideLargeSig = document.getElementById("hideLargeSig").checked;
  var largeSignaturesInput = document.getElementById("largeSigInput").value;
  
  var resizeLargeImages = document.getElementById("resizeLargeImages").checked;
  var largeImagesInput = document.getElementById("largeImgInput").value;

  var WYSIWYGCheckbox = document.getElementById("WYSIWYGCheckbox").checked;
  
  var addEdited = document.getElementById("addEdited").checked;

  var showSickles = document.getElementById("showSickles").checked;

  var banMeMillisec = new Date(document.getElementById("banMe").value).getTime();
  var lockBan = document.getElementById("lockBan").checked;

  chrome.storage.sync.set({
    darkSwitch: darkSwitchCheckbox,

    hideLargeSig: hideLargeSig,
    largeSignatures: largeSignaturesInput,

    resizeLargeImages: resizeLargeImages,
    largeImages: largeImagesInput,

    WYSIWYGCheckbox: WYSIWYGCheckbox,
    
    addEdited: addEdited,

    showSickles: showSickles,

    banMeMillisec: banMeMillisec,
    lockBan: lockBan
  }, function() {
    // Update status to let user know options were saved.
    var optionsSaved = document.getElementById('optionsSaved');
    optionsSaved.textContent = 'Options saved.';
    setTimeout(function() {
      optionsSaved.textContent = '';
    }, 1000);
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

  $("#resizeLargeImages").change(function () {
    if(this.checked) {
        $("#largeImgInput").css("display", "initial");
        $("#resetLargeImg").css("display", "initial");
    } else {
        $("#largeImgInput").css("display", "none");
        $("#resetLargeImg").css("display", "none");
    }
  });

  $("#resetLargeImg").on("click", function () {
    $("#largeImgInput").val(40.781);
  });

  $("#resetLargeSig").on("click", function () {
    $("#largeSigInput").val(600);
  });

  document.getElementById("cancelBan").addEventListener("click", function () {
    if(confirm("את/ה בטוח/ה שאת/ה רוצה לבטל את הבאן?")) {
      chrome.storage.sync.set({ banMeMillisec: 0 });
      document.getElementById("banInfo").style.display = "initial";
      document.getElementById("cancelBan").style.display = "none";
    }
  });

  document.getElementById("lockBan").addEventListener("change", function () {
    if(document.getElementById("lockBan").checked == true) {
      document.getElementById("lockBan").checked = confirm("את/ה בטוח/ה שאת/ה רוצה לסמן באן זה כבלתי ניתן לביטול?");
    }
  });

  document.getElementById('saveOptions').addEventListener('click',
    save_options);
}