/*


    FILTERS CATEGORY AND SUB-CATEGORY (Worksss)


*/

import { deleteStore } from "./delete.js";

const baseUrl = "http://localhost:3001";
const storesList = document.getElementById("stores-list");
const categoryDropdown = document.getElementById("category");
const subcategoryDropdown = document.getElementById("subcategory");

// Reusable function to create store elements
function createStoreElements(store) {
  const storeContainer = document.createElement("div");
  storeContainer.classList.add("store-container");

  const storeName = document.createElement("h3");
  storeName.textContent = store.name;
  const storeUrl = document.createElement("p");
  storeUrl.innerHTML = `<strong>URL:</strong> ${store.url}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", function () {
    deleteStore(store.name);
  });

  const updateButton = document.createElement("button");
  updateButton.innerText = "Update";
  updateButton.addEventListener("click", function () {
    window.location.href = `update.html?storeName=${encodeURIComponent(
      store.name
    )}`;
  });

  storeContainer.appendChild(storeName);
  storeContainer.appendChild(storeUrl);
  storeContainer.appendChild(deleteBtn);
  storeContainer.appendChild(updateButton);

  return storeContainer;
}

// Function to fetch and display stores based on category
async function getStoresByCategory(category) {
  try {
    const response = await fetch(`${baseUrl}/store/${category}`);
    const stores = await response.json();
    storesList.innerHTML = ""; // Clear previous results
    stores.forEach((store) => {
      storesList.appendChild(createStoreElements(store));
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to fetch and display stores based on category and subcategory
async function getStoresByCategoryAndSubcategory(category, subcategory) {
  try {
    const response = await fetch(`${baseUrl}/store/${category}/${subcategory}`);
    const stores = await response.json();
    storesList.innerHTML = ""; // Clear previous results
    stores.forEach((store) => {
      storesList.appendChild(createStoreElements(store));
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Event listener for category dropdown change
categoryDropdown.addEventListener("change", async function () {
  const category = categoryDropdown.value;
  if (category) {
    // Fetch subcategories based on the selected category
    try {
      const response = await fetch(`${baseUrl}/subcategories/${category}`);
      const subcategories = await response.json();
      populateSubcategoryDropdown(subcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  } else {
    // If no category is selected, clear the subcategory dropdown
    clearSubcategoryDropdown();
  }
});

// Function to populate subcategory dropdown
function populateSubcategoryDropdown(subcategories) {
  console.log("Subcategories received:", subcategories); // Log the value of subcategories
  subcategoryDropdown.innerHTML =
    '<option value="">Select Subcategory</option>';
  // Check if subcategories is an array before iterating over it
  if (Array.isArray(subcategories)) {
    subcategories.forEach((subcategory) => {
      // Access the 'name' property of each subcategory object
      const subcategoryName = subcategory.subcategory;
      const option = document.createElement("option");
      option.value = subcategoryName; // Assuming 'name' is the property containing the subcategory name
      option.textContent = subcategoryName; // Set the option text to the subcategory name
      subcategoryDropdown.appendChild(option);
    });
  } else {
    // Handle the case where subcategories is not an array (e.g., empty result set)
    console.error("Subcategories is not an array:", subcategories);
  }
}

// Function to clear subcategory dropdown
function clearSubcategoryDropdown() {
  subcategoryDropdown.innerHTML =
    '<option value="">Select Subcategory</option>';
}

// Event listener for filter button
document.getElementById("filterBtn").addEventListener("click", function () {
  const category = categoryDropdown.value;
  const subcategory = subcategoryDropdown.value;
  if (category && subcategory) {
    getStoresByCategoryAndSubcategory(category, subcategory);
  } else if (category) {
    getStoresByCategory(category);
  } else {
    alert("Please select both category and subcategory.");
  }
});

// Event listener for reset button
document.getElementById("resetBtn").addEventListener("click", function () {
  categoryDropdown.selectedIndex = 0; // Reset category dropdown
  clearSubcategoryDropdown(); // Clear subcategory dropdown
  fetchAllStores(); // Call function to fetch all stores
});

// Function to fetch and display all stores
async function fetchAllStores() {
  try {
    const response = await fetch(`${baseUrl}/allStores`);
    const stores = await response.json();
    storesList.innerHTML = ""; // Clear previous results
    stores.forEach((store) => {
      storesList.appendChild(createStoreElements(store));
    });
  } catch (error) {
    console.error("Error fetching all stores:", error);
  }
}

// Event listener for create store button
document
  .getElementById("createStoreBtn")
  .addEventListener("click", function () {
    window.location.href = "create.html";
  });

// Initial fetch to display all stores
fetchAllStores();
