function setUI() {
  if (clock_interval)
    clearInterval(clock_interval);
  chrome.storage.sync.get(['options'], function(result) {
    if (result.options != undefined) {
      var theme_id = result.options.theme;
      var theme_button = document.getElementById(theme_id);
      var theme_buttons_parent = document.getElementsByClassName("theme-settings")[0];
      for (var i = 0; i < theme_buttons_parent.children.length; i++)
        theme_buttons_parent.children[i].classList.remove("active");
      theme_button.classList.add("active");
      console.log(theme_id);
      var clock_format = result.options.clock_format;
      if (clock_format === "24")
        initClock("24");
      else
        initClock("12"); 
      themes[theme_id]();
    } else {
      var theme_button = document.getElementById("0");
      theme_button.classList.add("active");
      themes[0]();
      initClock("12");
    }
  });
}

function showOptions() {
  var settings_bar = document.getElementsByClassName("settings")[0];
  settings_bar.style.padding = "1rem";
  settings_bar.style.width = "20rem";
  settings_bar.classList.add("fadeIn");
  settings_bar.classList.remove("fadeOut");

  var settings_gear = document.getElementsByClassName("settings-gear")[0];
  settings_gear.style.display = "none";
}

function hideOptions() {
  var settings_bar = document.getElementsByClassName("settings")[0];
  settings_bar.style.padding = "0";
  settings_bar.style.width = "0";
  settings_bar.classList.add("fadeOut");
  settings_bar.classList.remove("fadeIn");

  var settings_gear = document.getElementsByClassName("settings-gear")[0];
  settings_gear.style.display = "block";
}

function storeClockFormat(format) {
  var options = {};

  chrome.storage.sync.get(['options'], function(result) {
    if (result.options == undefined) 
      options["clock_format"] = format;
    else {
      options = result.options;
      options["clock_format"] = format;
    }

    chrome.storage.sync.set({options: options});
  });
}