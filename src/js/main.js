window.onload = function () {
  init();
}

function init() {
  // Function to show the clock
  initClock();

  // Function to show the list
  updateList();

  // Listeners
  chrome.storage.onChanged.addListener(updateList);
  document.getElementsByTagName("form")[0].addEventListener("submit", function(e) {
    e.preventDefault();
    var item = document.getElementById("add");
    if (item.value.length != 0)
      storeItem(item.value);
    item.value = "";
  });
}