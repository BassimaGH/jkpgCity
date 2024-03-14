import { deleteStore } from "./delete.js";

const baseUrl = "http://localhost:3001";
const loginCheckUrl = "http://localhost:3001/protected"; // URL for the login check

const storesList = document.getElementById("stores-list");
const categoryDropdown = document.getElementById("category");
const subcategoryDropdown = document.getElementById("subcategory");
const districtDropdown = document.getElementById("district");
const nav = document.getElementById("nav");
const navBar = document.getElementById("navBar");

// Function to check login status
async function checkLoginStatus() {
  try {
    const response = await fetch(loginCheckUrl, { credentials: "include" }); // Ensure to include credentials to send cookies
    const data = await response.json();
    return data.isLoggedIn;
  } catch (error) {
    console.error("Failed to check login status:", error);
    return false;
  }
}

async function displayLoginLogoutButton() {
  const isLoggedIn = await checkLoginStatus();

  // Create login button
  const loginButton = document.createElement("button");
  loginButton.innerText = "Login";
  loginButton.id = "loginBtn";
  loginButton.classList.add("btn");
  loginButton.addEventListener("click", function () {
    window.location.href = "login.html";
  });

  // Create logout button
  const logoutButton = document.createElement("button");
  logoutButton.innerText = "Logout";
  logoutButton.id = "logoutBtn";
  logoutButton.classList.add("btn");
  logoutButton.addEventListener("click", function () {
    window.location.href = "/logout";
  });

  // Check if the user is logged in
  if (isLoggedIn) {
    // Remove login button if it exists
    if (document.getElementById("loginBtn")) {
      document.getElementById("loginBtn").remove();
    }
    // Append the logout button if it's not already present
    if (!document.getElementById("logoutBtn")) {
      // document.body.appendChild(logoutButton);
      navBar.appendChild(logoutButton);
    }
  } else {
    // Remove logout button if it exists
    if (document.getElementById("logoutBtn")) {
      document.getElementById("logoutBtn").remove();
    }
    // Append the login button if it's not already present
    if (!document.getElementById("loginBtn")) {
      navBar.appendChild(loginButton);
    }
  }
}

// Call the function to display the appropriate button based on login status
displayLoginLogoutButton();

// Reusable function to create store elements
async function createStoreElements(store) {
  const isLoggedIn = await checkLoginStatus();

  const storeContainer = document.createElement("div");
  storeContainer.classList.add("storeContainer");

  const storeName = document.createElement("h3");
  storeName.textContent = store.name;

  const visitWebsiteBtn = document.createElement("button");
  visitWebsiteBtn.innerText = "Visit Website";
  visitWebsiteBtn.classList.add("btn");
  visitWebsiteBtn.addEventListener("click", function () {
    window.location =
      store.url.substring(0, 4) === "http" ? store.url : `//${store.url}`;
  });

  const storeUrl = document.createElement("p");
  storeUrl.innerHTML = `<strong>District:</strong> ${store.district}`;
  if (isLoggedIn) {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("btn");

    deleteBtn.addEventListener("click", function () {
      deleteStore(store.name);
    });

    const updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.classList.add("btn");
    updateButton.addEventListener("click", function () {
      window.location.href = `update.html?storeName=${encodeURIComponent(
        store.name
      )}`;
    });

    storeContainer.appendChild(deleteBtn);
    storeContainer.appendChild(updateButton);
  }
  storeContainer.appendChild(storeName);
  storeContainer.appendChild(storeUrl);
  storeContainer.appendChild(visitWebsiteBtn);

  storesList.appendChild(storeContainer);
}

async function fetchAndPopulateDistricts() {
  try {
    const response = await fetch("/district");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const districts = await response.json();

    const districtDropdown = document.getElementById("district");
    districts.forEach((district) => {
      const option = document.createElement("option");
      option.value = district.district;
      option.textContent = district.district;
      districtDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Failed to fetch districts:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchAndPopulateDistricts);

// async function getStoresByDistrict(district) {
//   try {
//     // Ensure the URL correctly points to your backend endpoint for fetching stores by district.
//     const response = await fetch(`${baseUrl}/allStores/${district}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch stores");
//     }
//     const stores = await response.json();
//     storesList.innerHTML = ""; // Clear previous results

//     if (stores.length === 0) {
//       storesList.innerHTML = "<p>No stores found in this district.</p>";
//     } else {
//       stores.forEach((store) => {
//         createStoreElements(store); // Assuming this function appends store elements to the DOM
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching stores by district:", error);
//     storesList.innerHTML =
//       "<p>Error fetching stores. Please try again later.</p>";
//   }
// }

// document
//   .getElementById("filterBtnDistrict")
//   .addEventListener("click", function () {
//     const district = districtDropdown.value;
//     if (district) {
//       getStoresByDistrict(district);
//       console.log("HII");
//     } else {
//       alert("Please select district.");
//     }
//   });

function clearDistrictDropdown() {
  districtDropdown.innerHTML = '<option value="">Select district</option>';
}
///////////////////  DISTRICT FILTER//////////////

// Function to fetch and display stores based on category
async function getStoresByCategory(category) {
  try {
    const response = await fetch(`${baseUrl}/store/${category}`);
    const stores = await response.json();
    storesList.innerHTML = ""; // Clear previous results
    await Promise.all(
      stores.map(async (store) => {
        const storeElement = await createStoreElements(store);
        storesList.appendChild(storeElement);
      })
    );
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
    await Promise.all(
      stores.map(async (store) => {
        const storeElement = await createStoreElements(store);
        storesList.appendChild(storeElement);
      })
    );
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
  const district = districtDropdown.value;
  if (category && subcategory) {
    getStoresByCategoryAndSubcategory(category, subcategory);
  } else if (category) {
    getStoresByCategory(category);
    // } else if (district) {
    //   getStoresByDistrict(district);
    //   console.log("HII");
  } else {
    alert("Please select both category and subcategory.");
  }
});

// Event listener for reset button
document.getElementById("resetBtn").addEventListener("click", function () {
  categoryDropdown.selectedIndex = 0; // Reset category dropdown
  clearSubcategoryDropdown(); // Clear subcategory dropdown
  // clearDistrictDropdown();
  fetchAllStores(); // Call function to fetch all stores
});

// Function to create and append the 'Create Store' button
async function createCreateStoreButton() {
  const isLoggedIn = await checkLoginStatus();

  if (isLoggedIn) {
    // Only show the create button if logged in
    const createStoreButton = document.createElement("button");
    createStoreButton.innerText = "Create Store";
    createStoreButton.id = "createStoreBtn";
    createStoreButton.classList.add("btn");
    createStoreButton.addEventListener("click", function () {
      window.location.href = "create.html";
    });
    nav.appendChild(createStoreButton); // Append the button to the body
  }
}

createCreateStoreButton();

// Function to fetch and display all stores
async function fetchAllStores() {
  try {
    const response = await fetch(`${baseUrl}/allStores`);
    const stores = await response.json();
    storesList.innerHTML = ""; // Clear previous results
    const isLoggedIn = await checkLoginStatus();

    // Map over the stores array and wait for each createStoreElements call to finish before moving to the next one
    await Promise.all(
      stores.map(async (store) => {
        const storeElement = await createStoreElements(store);
        storesList.appendChild(storeElement);
      })
    );
  } catch (error) {
    console.error("Error fetching all stores:", error);
  }
}

fetchAllStores();
