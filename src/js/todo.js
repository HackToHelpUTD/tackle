/** FUNCTIONS THAT CHANGE CLOUD DATA */

function deleteItem(item) {
  chrome.storage.sync.get(['todoItems'], function(result) {
    if (result.todoItems != undefined || result.todoItems.length != 0) {
      var index = -1;
      var items = result.todoItems;

      for (var i = 0; i < items.length; i++) {
        if (items[i].id === item.id && items[i].name === item.name) {
          index = i;
          break;
        }
      }

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

function storeItem(itemName) {
  var id = Math.random().toString(36).substr(2, 9);
  var items;

  chrome.storage.sync.get(['todoItems'], function(result) {
    if (result.todoItems == undefined || result.todoItems.length == 0) {
      items = [{
        "id": id,
        "name": itemName
      }];
    } else {
      items = result.todoItems;
      items.push({
        "id": id,
        "name": itemName
      });
    }
    chrome.storage.sync.set({todoItems: items});
  });
}

/** ==== * ==== * ==== * ==== * ==== */

/** FUNCTIONS THAT MANIPULATE THE LIST */

function rmvListElements(items) {
  Object.keys(items).forEach(function (key) {
    if (items[key].delete) {
      // items[key].HTML.parentElement.removeChild(items[key].HTML);
      setTimeout(function () {
        fadeOutEffect(items[key].HTML);
      }, 200);
    }
  });
}

function addListElements(items) {
  items.forEach(function (item) {
    var listArea = document.getElementsByClassName("todo-list")[0];
    listArea.style = "display: block";

    var list = document.getElementsByClassName("list")[0];
  
    var todo_item = document.createElement("li");
    todo_item.classList.add("list-item");
  
    var label = document.createElement("label");
    label.classList.add("label-checkbox");
    label.setAttribute("for", item.id);
    label.addEventListener("change", function (e) {
      var item = {
        "id": e.srcElement.id,
        "name": e.srcElement.nextSibling.data
      };
      deleteItem(item);
    });
  
    var input = document.createElement("input");
    input.classList.add("checkbox");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", item.id);
  
    label.appendChild(input);
    label.innerHTML += item.name;
  
    todo_item.appendChild(label);
  
    list.appendChild(todo_item);
  });
}

/** ==== * ==== * ==== * ==== * ==== */

function updateList() {
  var items = document.getElementsByClassName("list")[0].children;
  var itemsToRmv = {};
  var itemsToAdd = [];
  var cloudItems = [];

  for (var item of items) {
    var id = item.childNodes[0].childNodes[0].id;
    itemsToRmv[id] = {
      "HTML": item,
      "delete": 1
    };
  }

  chrome.storage.sync.get(['todoItems'], function(result) {
    if (result.todoItems != undefined && result.todoItems.length != 0) {
      cloudItems = result.todoItems;
    
      cloudItems.forEach(function (item) {
        if (itemsToRmv[item.id] != undefined)
          itemsToRmv[item.id].delete = 0;
        else
          itemsToAdd.push(item);
      });

      rmvListElements(itemsToRmv);
      addListElements(itemsToAdd);
    }
  });
}
