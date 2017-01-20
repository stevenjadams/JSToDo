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
		
		// -- Add hightlight icon
		var iconHighlight = document.createElement("i"); // Creates delete icon
		iconHighlight.setAttribute("class", "fa fa-lg fa-star-o"); // Adds the classes to the delete icon
		iconHighlight.setAttribute("title", "Toggle highlight"); // Adds the a title
		ulTaskListItem.appendChild(iconHighlight); // Appends icon to <li>
		
		// -- Add indent icon
		var iconIndent = document.createElement("i"); // Creates delete icon
		iconIndent.setAttribute("class", "fa fa-lg fa-indent"); // Adds the classes to the delete icon
		iconIndent.setAttribute("title", "Toggle indentation"); // Adds the a title
		ulTaskListItem.appendChild(iconIndent); // Appends icon to <li>
		
		// -- Add move icon
		var iconMove = document.createElement("i"); // Creates delete icon
		iconMove.setAttribute("class", "fa fa-lg fa-arrows-v"); // Adds the classes to the delete icon
		iconMove.setAttribute("title", "Move item"); // Adds the a title
		ulTaskListItem.appendChild(iconMove); // Appends icon to <li>
		
		// Storage
		taskList.unshift(ulTaskList.innerHTML); // Update array <li>s
		localStorage.setItem("taskList", JSON.stringify(taskList)); // Update localStorage with array
		
		taskListContainer.style.display = "block"; // Set list container to be visible once first item is added
		inputInitialField.value = ""; // Remove value from input field
		inputInitialField.focus(); // Set focus back to field
		removeTask(); // Run remove task function to add the onclick event
		indentTask() // Run indent task function to add the onclick event
		highLightTask() // Run highlight task function to add the onclick event
	}
}
buttonSave.addEventListener("click", saveTask);

// Remove list items
function removeTask() {
	var ulTaskListRemoveIcons = ulTaskList.getElementsByClassName("fa-trash"); // Gets all the <li>s in the list
	for (var i = 0; i < ulTaskListRemoveIcons.length; i++) { // Loops through <li>s in list
		ulTaskListRemoveIcons[i].onclick = function() { // Assigns an onClick to each <li>
			this.parentNode.remove(); // Remove the <li> that is clicked
			taskList.unshift(ulTaskList.innerHTML); // Update array <li>s
			localStorage.setItem("taskList", JSON.stringify(taskList)); // Update localStorage with array					
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
			taskList.unshift(ulTaskList.innerHTML); // Update array <li>s
			localStorage.setItem("taskList", JSON.stringify(taskList)); // Update localStorage with array
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
		// save
		taskList.unshift(ulTaskList.innerHTML); // Update array <li>s
		localStorage.setItem("taskList", JSON.stringify(taskList)); // Update localStorage with array

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
			taskList.unshift(ulTaskList.innerHTML); // Update array <li>s
			localStorage.setItem("taskList", JSON.stringify(taskList)); // Update localStorage with array
		}
	}
}
highLightTask()

// I want to be able to reorder list items
function moveItem() {
	var ulTaskListItems = ulTaskList.getElementsByClassName("fa-arrows-v");
	for (var i = 0; i < ulTaskListItems.length; i++) {
		ulTaskListItems[i].onclick = function () {
			var currentParent = this.parentNode.outerHTML;
			var nextItem = this.parentNode.nextSibling;
		}
	}
}
moveItem();