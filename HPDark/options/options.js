// Saves options to chrome.storage
function save_options() {
  var darkSwitchCheckbox = document.getElementById("darkSwitch").checked;
  var largeSignaturesInput = document.getElementById("largeSignatures").value;
  var WYSIWYGCheckbox = document.getElementById("WYSIWYGCheckbox").checked;
  chrome.storage.sync.set({
    darkSwitch: darkSwitchCheckbox,
    largeSignatures: largeSignaturesInput,
    WYSIWYGCheckbox: WYSIWYGCheckbox
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    darkSwitch: true,
    largeSignatures: 600,
    WYSIWYGCheckbox: false
  }, function(items) {
    document.getElementById("darkSwitch").checked = items.darkSwitch;
    document.getElementById("largeSignatures").value = items.largeSignatures;
    document.getElementById("WYSIWYGCheckbox").checked = items.WYSIWYGCheckbox;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

document.getElementById("resetSig").addEventListener("click", function () { document.getElementById("largeSignatures").value = 600; });