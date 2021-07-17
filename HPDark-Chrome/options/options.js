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
    darkMode: true,
    
    hideLargeSig: true,
    largeSignatures: 600,

    resizeLargeImages: true,
    largeImages: 40.781,

    WYSIWYGCheckbox: false,

    addEdited: false,

    showSickles: true,

    banMeMillisec: 0,
    lockBan: false,

    colors: false
  }, function(items) {
    document.getElementById("darkSwitch").checked = items.darkMode;

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
      document.getElementById("cancelBanDIV").innerHTML = (items.lockBan ?
         "הבאן הנוכחי נעול." :
          "<button id='cancelBan'>בטל באן פעיל</button>");
      // Yes, it will be pretty easy to remove the ban even if its locked. Self control is important, people.
      // But I challenge you to remove it without using that button :) (Its possible!)

      if(items.lockBan) {
        document.getElementById("cancelBanDIV").innerHTML = ("הבאן הנוכחי נעול.");
      } else {
        document.getElementById("cancelBanDIV").innerHTML = ("<button id='cancelBan'>בטל באן פעיל</button>");

        document.getElementById("cancelBan").addEventListener("click", function () {
          if(confirm("את/ה בטוח/ה שאת/ה רוצה לבטל את הבאן?")) {
            chrome.storage.sync.set({ banMeMillisec: 0 });
            document.getElementById("cancelBanDIV").innerHTML = "הבאן בוטל, יש לטעון מחדש את העמוד.";
          }
        });
      }
    } else {
      document.getElementById("cancelBanDIV").innerHTML = "אין באן פעיל";
    }

    if(items.colors != false) {

    }
  });
}

// Save options to chrome storage
function save_options() {
  var darkSwitchCheckbox = document.getElementById("darkSwitch").checked;

  var hideLargeSig = document.getElementById("hideLargeSig").checked;
  var largeSignaturesInput = document.getElementById("largeSigInput").value;
  
  var resizeLargeImages = document.getElementById("resizeLargeImages").checked;
  var largeImagesInput = document.getElementById("largeImgInput").value;

  var WYSIWYGCheckbox = document.getElementById("WYSIWYGCheckbox").checked;
  
  var addEdited = document.getElementById("addEdited").checked;

  var showSickles = document.getElementById("showSickles").checked;

  chrome.storage.sync.get( { banMeMillisec: 0 }, function(data) {
    if(data.banMeMillisec == 0) {
      var banMeMillisec = new Date(document.getElementById("banMe").value).getTime();
      var lockBan = document.getElementById("lockBan").checked;

      chrome.storage.sync.set({
        banMeMillisec: banMeMillisec,
        lockBan: lockBan
      });
    }
  });

  chrome.storage.sync.set({
    darkMode: darkSwitchCheckbox,

    hideLargeSig: hideLargeSig,
    largeSignatures: largeSignaturesInput,

    resizeLargeImages: resizeLargeImages,
    largeImages: largeImagesInput,

    WYSIWYGCheckbox: WYSIWYGCheckbox,
    
    addEdited: addEdited,

    showSickles: showSickles,

    colors: colorList
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

  $("#lockBan").on("change", function () {
    if(document.getElementById("lockBan").checked == true) {
      document.getElementById("lockBan").checked = confirm("את/ה בטוח/ה שאת/ה רוצה לסמן באן זה כבלתי ניתן לביטול?");
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
      chrome.storage.sync.set({ colors: false });
      $("#colorList").html("");
    }
  })

  $("#saveOptions").on('click',
    save_options);

  chrome.storage.sync.get({ banMeMillisec: 0 }, function (data) {
    if(data.banMeMillisec > (new Date()).valueOf()) {
      document.getElementById("setUpBanTR").innerHTML = "<td>יש לך באן פעיל.</td>";
    }
  });
}