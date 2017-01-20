// DOM elements
var inputInitialField = document.getElementById("inputEnterItem");
var buttonSave = document.getElementById("btnSave");
var taskListContainer = document.getElementById("task-list");
var ulTaskList = document.getElementById("taskList");

// Create array for task list if localStorage is empty
if (JSON.parse(localStorage.getItem("taskList")) === null) {
	var taskList = [];
}
// Create array for task list and populate with items from localStorage
else {
	var taskList = JSON.parse(localStorage.getItem("taskList"));
	taskListContainer.style.display = "block";
}

// Load task list from taskList array and update DOM
if (taskList.length > 0) {
	function loadListItems() {
		ulTaskList.innerHTML = taskList[0];
	}
	loadListItems();
}

// Update local storage and DOM with new task item
function saveTask() {
	if (inputInitialField.value !== "") {
						
		// Updating DOM
		// -- Add new <li>
		var ulTaskListItem = document.createElement("li"); // Creates <li>
		var ulTaskListItemValue = document.createTextNode(inputInitialField.value); // Creates variable for text entered
		
		var ulTaskListItemContainer = document.createElement("span"); // Creates <span>
		ulTaskListItemContainer.setAttribute("contenteditable", "true"); // Makes <span> editable
		ulTaskListItemContainer.appendChild(ulTaskListItemValue); // Appends value to <span>
		ulTaskListItem.appendChild(ulTaskListItemContainer); // Appends <span> to <li>
		
		ulTaskList.appendChild(ulTaskListItem); // Appends <li> and text to bottom of <ul>
		
		// -- Add remove icon
		var iconRemove = document.createElement("i"); // Creates delete icon
		iconRemove.setAttribute("class", "fa fa-lg fa-trash"); // Adds the classes to the delete icon
		iconRemove.setAttribute("title", "Delete"); // Adds the classes to the delete icon
		ulTaskListItem.appendChild(iconRemove); // Appends icon to <li>
		
		// -- Add highlight icon
		var iconHighlight = document.createElement("i"); // Creates delete icon
		iconHighlight.setAttribute("class", "fa fa-lg fa-star-o"); // Adds the classes to the delete icon
		iconHighlight.setAttribute("title", "Toggle highlight"); // Adds the a title
		ulTaskListItem.appendChild(iconHighlight); // Appends icon to <li>
		
		// -- Add indent icon
		var iconIndent = document.createElement("i"); // Creates delete icon
		iconIndent.setAttribute("class", "fa fa-lg fa-indent"); // Adds the classes to the delete icon
		iconIndent.setAttribute("title", "Toggle indentation"); // Adds the a title
		ulTaskListItem.appendChild(iconIndent); // Appends icon to <li>
		
		// -- Add move down icon
		var iconMoveDown = document.createElement("i"); // Creates move down icon
		iconMoveDown.setAttribute("class", "fa fa-lg fa-angle-down"); // Adds the classes to the move down icon
		iconMoveDown.setAttribute("title", "Move item down"); // Adds the a title
		ulTaskListItem.appendChild(iconMoveDown); // Appends icon to <li>
		
		// -- Add move up icon
		var iconMoveUp = document.createElement("i"); // Creates up down icon
		iconMoveUp.setAttribute("class", "fa fa-lg fa-angle-up"); // Adds the classes to the move up icon
		iconMoveUp.setAttribute("title", "Move item up"); // Adds the a title
		ulTaskListItem.appendChild(iconMoveUp); // Appends icon to <li>
		
		updateStorage(); // Update array and localStorage
		
		taskListContainer.style.display = "block"; // Set list container to be visible once first item is added
		inputInitialField.value = ""; // Remove value from input field
		inputInitialField.focus(); // Set focus back to field
		removeTask(); // Run remove task function to add the onclick event
		indentTask(); // Run indent task function to add the onclick event
		highLightTask(); // Run highlight task function to add the onclick event
		moveItemDown(); // Run move task down function to add the onclick event
		moveItemUp(); // Run move task up function to add the onclick event
	}
}
buttonSave.addEventListener("click", saveTask);

// Update array and localStorage
function updateStorage() {
	taskList.unshift(ulTaskList.innerHTML); // Update array <li>s
	localStorage.setItem("taskList", JSON.stringify(taskList)); // Update localStorage with array	
}

// Remove list items
function removeTask() {
	var ulTaskListRemoveIcons = ulTaskList.getElementsByClassName("fa-trash"); // Gets all the <li>s in the list
	for (var i = 0; i < ulTaskListRemoveIcons.length; i++) { // Loops through <li>s in list
		ulTaskListRemoveIcons[i].onclick = function() { // Assigns an onClick to each <li>
			this.parentNode.remove(); // Remove the <li> that is clicked
			updateStorage(); // Update array and localStorage				
			if (ulTaskList.getElementsByTagName("li").length === 0) {
				localStorage.clear();
				taskListContainer.style.display = "none"; // Hide list container if array is empty
			}
		}
	}
}
removeTask()

// Nest list items
function indentTask() {
	var ulTaskListIndentIcons = ulTaskList.getElementsByClassName("fa-indent");
	for (var i = 0; i < ulTaskListIndentIcons.length; i++) {
		ulTaskListIndentIcons[i].onclick = function() {
			if (this.parentNode.className === "highlight") {
				this.parentNode.className += " indent";
			}
			else if (this.parentNode.className === "") {
				this.parentNode.className = "indent";
			}
			else if (this.parentNode.className === "indent") {
				this.parentNode.className = "";
			}
			else {
				this.parentNode.className = "highlight";
			}
			updateStorage(); // Update array and localStorage
		}
	}
}
indentTask()

// I want to be able to edit list items
ulTaskList.addEventListener('keydown', function (event) {
  var esc = event.which == 27,
	  nl = event.which == 13,
	  el = event.target,
	  input = el.nodeName != 'INPUT' && el.nodeName != 'TEXTAREA',
	  data = {};

  if (input) {
	if (esc) {
	  // restore state
	  ulTaskList.execCommand('undo');
	  el.blur();
	}
	else if (nl) {
		updateStorage(); // Update array and localStorage
		el.blur();
		event.preventDefault();
	}
  }
}, true);

// Highlight list items
function highLightTask() {
	var ulTaskListHighlightIcons = ulTaskList.getElementsByClassName("fa-star-o");
	for (var i = 0; i < ulTaskListHighlightIcons.length; i++) {
		ulTaskListHighlightIcons[i].onclick = function () {
			if (this.parentNode.className === "indent") {
				this.parentNode.className += " highlight";
			}
			else if (this.parentNode.className === "") {
				this.parentNode.className = "highlight";
			}
			else if (this.parentNode.className === "highlight") {
				this.parentNode.className = "";
			}
			else {
				this.parentNode.className = "indent";
			}
			updateStorage(); // Update array and localStorage
		}
	}
}
highLightTask()

// Move list item down
function moveItemDown() {
	var ulTaskListItems = ulTaskList.getElementsByClassName("fa-angle-down");
	for (var i = 0; i < ulTaskListItems.length; i++) {
		ulTaskListItems[i].onclick = function () {
			var currentListItem = this.parentNode; // <li> Current
			var nextListItem = this.parentNode.nextSibling; // <li> Next
			var list = this.parentNode.parentNode; // <ul>
			if (nextListItem !== null) {
				list.insertBefore(currentListItem, nextListItem.nextSibling);
				updateStorage(); // Update array and localStorage
			}
		}
	}
}
moveItemDown();

// Move list item up
function moveItemUp() {
	var ulTaskListItems = ulTaskList.getElementsByClassName("fa-angle-up");
	for (var i = 0; i < ulTaskListItems.length; i++) {
		ulTaskListItems[i].onclick = function () {
			var currentListItem = this.parentNode; // <li> Current
			var prevListItem = this.parentNode.previousSibling; // <li> Previous
			var list = this.parentNode.parentNode; // <ul>
			if (prevListItem !== null) {
				list.insertBefore(currentListItem, currentListItem.previousSibling);
				updateStorage(); // Update array and localStorage
			}
		}
	}
}
moveItemUp();