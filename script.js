// Variables
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");

// Adding
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Create List Item
  const li = document.createElement("li");

  // Adding Text To Li
  li.appendChild(document.createTextNode(newItem));

  // Creating Button
  const button = createButton("remove-item btn-link text-red");
  
  // Adding Button To Li
  li.appendChild(button);
  
  // Add Li To DOM
  itemList.appendChild(li);

  // Check UI
  resetUI();

  // Reset Input Value
  itemInput.value = "";
}

// Adding Utility Functions
function createButton(classes) {
  // Creating Button
  const button = document.createElement("button");
  
  // Adding Button Classes
  button.className = classes;
  
  // Creating Icon
  const icon = createIcon("fa-solid fa-xmark");
  
  // Adding Icon Classes
  button.appendChild(icon);
  
  // Returning Button
  return button;
}

function createIcon(classes) {
  // Creating Icon
  const icon = document.createElement("i");

  // Adding Icon Classes
  icon.className = classes;

  // Returning Icon
  return icon;
}

// Removing
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }

  // Check UI
  resetUI();
}

// Clearing
function clearItems() {
  // Easy Way
  // itemList.innerHTML = ""
  // Faster Way
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Check UI
  resetUI();
}

// Deleting Extra Components Of Website Based On List
function resetUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);

// Checkers/Resetters
resetUI();
