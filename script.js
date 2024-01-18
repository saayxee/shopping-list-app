// Variables
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");

// Display Items
function displayItems() {
  // Get Items From Storage
  const itemsFromStorage = getItemFromStorage();

  // Loop
  itemsFromStorage.forEach((item) => addItemToDOM(item));

  // Reset UI
  resetUI();
}

// Add To DOM And Local Storage
function onAddItemSubmit(e) {
  // Prevent URL From Changing
  e.preventDefault();

  // Variables
  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    // Alert User To Add Item
    alert("Please add an item");
    return;
  }

  // Add Item To DOM
  addItemToDOM(newItem);

  // Add Item To Local Storage
  addItemToStorage(newItem);

  // Check UI
  resetUI();

  // Reset Input Value
  itemInput.value = "";
}

// Add Item To DOM
function addItemToDOM(item) {
  // Create List Item
  const li = document.createElement("li");

  // Add Text To Li
  li.appendChild(document.createTextNode(item));

  // Create Button
  const button = createButton("remove-item btn-link text-red");

  // Add Button To Li
  li.appendChild(button);

  // Add Li To DOM
  itemList.appendChild(li);
}

// Add Utility Functions
function createButton(classes) {
  // Create Button
  const button = document.createElement("button");

  // Add Button Classes
  button.className = classes;

  // Create Icon
  const icon = createIcon("fa-solid fa-xmark");

  // Add Icon Classes
  button.appendChild(icon);

  // Return Button
  return button;
}

function createIcon(classes) {
  // Create Icon
  const icon = document.createElement("i");

  // Add Icon Classes
  icon.className = classes;

  // Return Icon
  return icon;
}

// Add Items To Storage
function addItemToStorage(item) {
  // Variables
  const itemsFromStorage = getItemFromStorage();

  // Add Items To Items From Storage || Array
  itemsFromStorage.push(item);

  // Convert To JSON String And Add To Local Storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Get Items From Storage
function getItemFromStorage() {
  // Variables
  const itemsFromStorage = JSON.parse(localStorage.getItem("items")) ?? [];

  // Return
  return itemsFromStorage;
}

// Remove Item
function removeItem(item) {
  if (
    confirm(`Are you sure you want to delete the item "${item.textContent}"?`)
  ) {
    // Remove Item From DOM
    item.remove();

    // Remove Item From Storage
    removeItemFromStorage(item.textContent);

    // Reset UI
    resetUI();
  }
}

// On Click Item List
function onClickItem(e) {
  // If Parent Element Contains "remove-item" As A Class Name
  if (e.target.parentElement.classList.contains("remove-item")) {
    // Remove Item Entirely
    removeItem(e.target.parentElement.parentElement);
  }
}

// Remove Item From Storage
function removeItemFromStorage(item) {
  // Get Items From Storage
  let itemsFromStorage = getItemFromStorage();

  // Filter Out Item To Be Removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Remove Item From Storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// Clear Items
function clearItems() {
  // itemList.innerHTML = ""
  // Loop Through ItemList
  while (itemList.firstChild) {
    // Remove From DOM
    itemList.removeChild(itemList.firstChild);
  }

  // Clear From Storage
  clearItemsFromStorage();

  // Check UI
  resetUI();
}

// Clear Items From Storage
function clearItemsFromStorage() {
  localStorage.removeItem("items");
}
// Filter Items
function filterItems(e) {
  // Variables
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  // Loop
  items.forEach((item) => {
    // Item Text
    const itemName = item.firstChild.textContent.toLowerCase();
    // If Includes Filter
    if (itemName.includes(text)) {
      // Set Display Flex
      item.style.display = "flex";
    }
    // Else If Doesn't
    else {
      // Set Display None
      item.style.display = "none";
    }
  });
}

// Delete Extra Components Of Website Based On List
function resetUI() {
  // Variables
  const items = itemList.querySelectorAll("li");

  // Remove Extra Components Based On List Items
  if (items.length === 0) {
    // Set Display None
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  }
  // Add Extra Components Based On List Items
  else {
    // Set Display Block
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Initialize App
function initializeApp() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
}

// Checkers/Resetters
resetUI();
initializeApp();
