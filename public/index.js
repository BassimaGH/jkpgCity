// import { deleteStore } from "./delete.js";
// const source = "http://localhost:3001/allStores";

// fetch(source)
//   .then((response) => response.json())
//   .then((stores) => {
//     console.log(stores);
//     const storesList = document.getElementById("stores-list");
//     stores.forEach((store) => {
//       const storeContainer = document.createElement("div");
//       storeContainer.classList.add("store-container");

//       const storeName = document.createElement("h3");
//       storeName.textContent = store.name;
//       const storeUrl = document.createElement("p");
//       storeUrl.innerHTML = `<strong>URL:</strong> ${store.url}`;

//       const deleteBtn = document.createElement("button");
//       deleteBtn.innerText = "Delete";
//       deleteBtn.addEventListener("click", function () {
//         deleteStore(store.name);
//       });

//       const updateButton = document.createElement("button");
//       updateButton.innerText = "Update";
//       updateButton.addEventListener("click", function () {
//         window.location.href = `update.html?storeName=${encodeURIComponent(
//           store.name
//         )}`;
//       });

//       storeContainer.appendChild(storeName);
//       storeContainer.appendChild(storeUrl);
//       storeContainer.appendChild(deleteBtn);
//       storeContainer.appendChild(updateButton);
//       storesList.appendChild(storeContainer);
//     });
//   });

// function goToCreatePage() {
//   window.location.href = "create.html";
// }

// document
//   .getElementById("createStoreBtn")
//   .addEventListener("click", goToCreatePage);

// // Login

// function goToLoginPage() {
//   window.location.href = "login.html";
// }
// document.getElementById("LogineBtn").addEventListener("click", goToLoginPage);

// function goToLogOutPage() {
//   window.location.href = "/logout";
// }
// document.getElementById("LogOuBtn").addEventListener("click", goToLogOutPage);

///WORKINGGGGGG///////////
// Import the deleteStore function
import { deleteStore } from "./delete.js";

// URL of your backend endpoints
const source = "http://localhost:3001/allStores";
const loginCheckUrl = "http://localhost:3001/protected"; // URL for the login check
const baseUrl = "http://localhost:3001";

////////////////////////////////////////////////////////////////////
// Function to get store by district
// async function getStoresByDistrict(district) {
//   try {
//     const response = await fetch(`${baseUrl}/store/${district}`);
//     const stores = await response.json();
//     storesList.innerHTML = ""; // Clear previous results
//     stores.forEach((store) => {
//       storesList.appendChild(createStoreElements(store));
//     });
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// // Event listener for category dropdown change
// districtDropdown.addEventListener("change", async function () {
//   const category = districtDropdown.value;
//   if (district) {
//     // Fetch subcategories based on the selected category
//     try {
//       const response = await fetch(`${baseUrl}/${district}`);
//       const district = await response.json();
//       populateSubcategoryDropdownDistrict(district);
//     } catch (error) {
//       console.error("Error fetching subcategories:", error);
//     }
//   } else {
//     // If no category is selected, clear the subcategory dropdown
//     populateSubcategoryDropdownDistrict();
//   }
// });

// // Function to populate subcategory dropdown
// function populateSubcategoryDropdownDistrict(district) {
//   console.log("Subcategories received:", subcategories); // Log the value of subcategories
//   subcategoryDropdown.innerHTML =
//     '<option value="">Select Subcategory</option>';
//   // Check if subcategories is an array before iterating over it
//   if (Array.isArray(subcategories)) {
//     subcategories.forEach((subcategory) => {
//       // Access the 'name' property of each subcategory object
//       const subcategoryName = subcategory.subcategory;
//       const option = document.createElement("option");
//       option.value = subcategoryName; // Assuming 'name' is the property containing the subcategory name
//       option.textContent = subcategoryName; // Set the option text to the subcategory name
//       subcategoryDropdown.appendChild(option);
//     });
//   } else {
//     // Handle the case where subcategories is not an array (e.g., empty result set)
//     console.error("Subcategories is not an array:", subcategories);
//   }
// }

// // Function to clear subcategory dropdown
// function clearSubcategoryDropdown() {
//   subcategoryDropdown.innerHTML =
//     '<option value="">Select Subcategory</option>';
// }

///////////////////////////////////////////////////////////////////////////

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
  loginButton.id = "loginBtn"; // Optionally add an ID for styling or further reference
  loginButton.addEventListener("click", function () {
    window.location.href = "login.html";
  });

  // Create logout button
  const logoutButton = document.createElement("button");
  logoutButton.innerText = "Logout";
  logoutButton.id = "logoutBtn"; // Optionally add an ID for styling or further reference
  logoutButton.addEventListener("click", function () {
    window.location.href = "/logout";
  });

  const nav = document.getElementById("nav");
  // Check if the user is logged in
  if (isLoggedIn) {
    // Remove login button if it exists
    if (document.getElementById("loginBtn")) {
      document.getElementById("loginBtn").remove();
    }
    // Append the logout button if it's not already present
    if (!document.getElementById("logoutBtn")) {
      // document.body.appendChild(logoutButton);
      nav.appendChild(logoutButton);
    }
  } else {
    // Remove logout button if it exists
    if (document.getElementById("logoutBtn")) {
      document.getElementById("logoutBtn").remove();
    }
    // Append the login button if it's not already present
    if (!document.getElementById("loginBtn")) {
      nav.appendChild(loginButton);
    }
  }
}

// Call the function to display the appropriate button based on login status
displayLoginLogoutButton();

// Function to render stores if logged in
async function renderStoresIfLoggedIn() {
  const isLoggedIn = await checkLoginStatus();

  fetch(source)
    .then((response) => response.json())
    .then((stores) => {
      console.log(stores);
      const storesList = document.getElementById("stores-list");
      stores.forEach((store) => {
        const storeContainer = document.createElement("div");
        storeContainer.classList.add("store-container");

        const storeName = document.createElement("h3");
        storeName.textContent = store.name;
        const storeUrl = document.createElement("p");
        storeUrl.innerHTML = `<strong>URL:</strong> ${store.url}`;
        if (isLoggedIn) {
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

          storeContainer.appendChild(deleteBtn);
          storeContainer.appendChild(updateButton);
        }
        storeContainer.appendChild(storeName);
        storeContainer.appendChild(storeUrl);

        // This condition is already ensured but kept for clarity

        storesList.appendChild(storeContainer);
      });
      const nav = document.getElementById("nav");

      if (isLoggedIn) {
        // Only show the create button if logged in
        const createStoreButton = document.createElement("button");
        createStoreButton.innerText = "Create Store";
        createStoreButton.id = "createStoreBtn"; // Optionally add an ID for styling or further reference
        createStoreButton.addEventListener("click", function () {
          window.location.href = "create.html";
        });
        nav.appendChild(createStoreButton); // Append the button to the body
      }
    });
}

// Call the function to render stores if logged in
renderStoresIfLoggedIn();

// Navigation functions remain the same

// function goToCreatePage() {
//   window.location.href = "create.html";
// }

// document
//   .getElementById("createStoreBtn")
//   .addEventListener("click", goToCreatePage);

// function goToLoginPage() {
//   window.location.href = "login.html";
// }

// document.getElementById("LogineBtn").addEventListener("click", goToLoginPage);

// function goToLogOutPage() {
//   window.location.href = "/logout";
// }
// document.getElementById("LogOuBtn").addEventListener("click", goToLogOutPage);

// Function to dynamically display login or logout button
