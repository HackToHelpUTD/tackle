window.onload = function () {
  init();
}

function init() {
  initClock();
  fetchList(populateList);
  document.getElementById("submit").addEventListener("click", addItem);
  document.getElementsByTagName("form")[0].addEventListener("submit", function(e) {
    e.preventDefault();
    addItem();
  });
}

function removeTodoItem(e) {
  setTimeout(function () {
    var child = e.srcElement.parentNode.parentNode;
    fadeOutEffect(child);
  }, 200);
  var itemName = e.srcElement.nextSibling.data;
  removeFromStorage(itemName);
}

function fadeOutEffect(fadeTarget) {
  var fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
        fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity > 0) {
        fadeTarget.style.opacity -= 0.5;
      } else {
        var parent = fadeTarget.parentNode;
        parent.removeChild(fadeTarget);
        clearInterval(fadeEffect);
      }
  }, 100);
}

function addItem() {
  var itemName = document.getElementById("add").value;
  document.getElementById("add").value = "";

  if (itemName.length != 0) {
    updateTodoList(itemName);
    storeTodoItem(itemName);
  }
}

function removeFromStorage(itemName) {
  chrome.storage.sync.get(['todoItems'], function(result) {
    if (result.todoItems != undefined || result.todoItems.length != 0) {
      var items = result.todoItems;
      var index = items.indexOf(itemName);
      if (index > -1) {
        items.splice(index, 1);
      }
      chrome.storage.sync.set({todoItems: items}, function() {
        if (items.length == 0) {
          var list = document.getElementsByClassName("todo-list")[0];
          list.style = "display: none";
        }
      });
    }
  });
}

function storeTodoItem(itemName) {
  chrome.storage.sync.get(['todoItems'], function(result) {
    if (result.todoItems == undefined || result.todoItems.length == 0) {
      var items = [itemName];
      chrome.storage.sync.set({todoItems: items}, function() {
        console.log('Value is set to ' + items);
      });
    } else {
      var items = result.todoItems;
      items.push(itemName);
      chrome.storage.sync.set({todoItems: items}, function() {
        console.log('Value is set to ' + items);
      });
    }
  });
}

function initClock() {
  showTime();
  setInterval(showTime, 1000);
}

function fetchList(resolve) {
  var todo_items = [];

  chrome.storage.sync.get(['todoItems'], function(result) {
    if (result.todoItems != undefined && result.todoItems.length != 0)
      todo_items = result.todoItems;

    resolve(todo_items);
  });
}

function populateList(items) {
  if (items.length != 0) {
    var list = document.getElementsByClassName("todo-list")[0];
    list.style = "display: block";
  }

  items.forEach(function (item) {
    updateTodoList(item);
  });
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

function updateTodoList(itemName) {
  var list = document.getElementsByClassName("todo-list")[0];
  list.style = "display: block";

  var id = Math.random().toString(36).substr(2, 9);
  var list = document.getElementsByClassName("list")[0];

  var todo_item = document.createElement("li");
  todo_item.classList.add("list-item");

  var label = document.createElement("label");
  label.classList.add("label-checkbox");
  label.setAttribute("for", id);
  label.addEventListener("change", removeTodoItem);

  var input = document.createElement("input");
  input.classList.add("checkbox");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", id);

  label.appendChild(input);
  label.innerHTML += itemName;

  todo_item.appendChild(label);

  list.appendChild(todo_item);
}