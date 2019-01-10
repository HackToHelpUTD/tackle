window.onload = function () {
  init();
}

var clock_interval = null;

function init() {
  // Function to show the clock and theme
  setUI();

  // Function to show the list
  updateList();

  // Listeners
  chrome.storage.onChanged.addListener(function() {
    setUI();
    updateList();
  });
  document.getElementsByTagName("form")[0].addEventListener("submit", function(e) {
    e.preventDefault();
    var item = document.getElementById("add");
    if (item.value.length != 0)
      storeItem(item.value);
    item.value = "";
  });
  document.getElementById("settings-toggler").addEventListener("click", showOptions);
  document.getElementById("exit-options").addEventListener("click", hideOptions);
  document.getElementById("24").addEventListener("click", function() {
    storeClockFormat("24");
  });
  document.getElementById("12").addEventListener("click", function() {
    storeClockFormat("12");
  });
  var theme_buttons = document.getElementsByClassName("theme-option");
  for (var button of theme_buttons) {
    button.addEventListener("click", function(e) {
      storeTheme(e.srcElement.id);
    });
  }
}