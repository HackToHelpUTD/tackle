var themes = [
  classic,
  freshClean,
  greenDelight,
  blueNight
]

function freshClean() {
  var body = document.getElementsByTagName("body")[0];
  var clock = document.getElementsByClassName("clock")[0];
  var form = document.getElementById("input");

  body.style.background = "#4abdac";
  clock.style.color = "#dfdce3";
  form.style.color = "#424242";
}

function greenDelight() {
  var body = document.getElementsByTagName("body")[0];
  var clock = document.getElementsByClassName("clock")[0];
  var form = document.getElementById("input");

  body.style.background = "#5cdb95";
  clock.style.color = "#edf5e1";
  form.style.color = "#05386b";
}

function blueNight() {
  var body = document.getElementsByTagName("body")[0];
  var clock = document.getElementsByClassName("clock")[0];
  var form = document.getElementById("input");

  body.style.background = "#0375b4";
  clock.style.color = "#262228";
  form.style.color = "#262228";
}

function classic() {
  var body = document.getElementsByTagName("body")[0];
  var clock = document.getElementsByClassName("clock")[0];
  var form = document.getElementById("input");

  body.style.background = "#f8f9fa";
  clock.style.color = "#424242";
  form.style.color = "#424242";
}

function storeTheme(theme_id) {
  var options = {};

  chrome.storage.sync.get(['options'], function(result) {
    if (result.options == undefined) 
      options["theme"] = theme_id;
    else {
      options = result.options;
      options["theme"] = theme_id;
    }

    chrome.storage.sync.set({options: options});
    console.log(options);
  });
}