function initClock() {
  showTime();
  setInterval(showTime, 1000);
}

function showTime() {
  var time = getTime_12();
  var DOM_clock = document.getElementsByClassName("clock")[0];

  DOM_clock.innerHTML == time ? null : DOM_clock.innerHTML = time;
}

function getTime_24() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();

  m < 10 ? m = "0" + m : m = m; 

  var time = h + ":" + m;
  
  return time;
}

function getTime_12() {
  var d = new Date();
  var post_t = "AM";
  var h = d.getHours();
  var m = d.getMinutes();

  if (h >= 12) {
    h = h - 12;
    post_t = "PM";
  }
  h == 0 ? h = 12 : h = h;
  m < 10 ? m = "0" + m : m = m;

  var time = h + ":" + m + " " + post_t;

  return time;
}