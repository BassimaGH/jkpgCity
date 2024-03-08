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
    });
}

// Call the function to render stores if logged in
renderStoresIfLoggedIn();

// Navigation functions remain the same
function goToCreatePage() {
  window.location.href = "create.html";
}

document
  .getElementById("createStoreBtn")
  .addEventListener("click", goToCreatePage);

function goToLoginPage() {
  window.location.href = "login.html";
}
document.getElementById("LogineBtn").addEventListener("click", goToLoginPage);

function goToLogOutPage() {
  window.location.href = "/logout";
}
document.getElementById("LogOuBtn").addEventListener("click", goToLogOutPage);
