import { deleteStore } from "./delete.js";
const source = "http://localhost:3001/allStores";

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
      storesList.appendChild(storeContainer);
    });
  });

function goToCreatePage() {
  window.location.href = "create.html";
}

document
  .getElementById("createStoreBtn")
  .addEventListener("click", goToCreatePage);

// Login

function goToLoginPage() {
  window.location.href = "login.html";
}
document.getElementById("LogineBtn").addEventListener("click", goToLoginPage);

function goToLogOutPage() {
  window.location.href = "/logout";
}
document.getElementById("LogOuBtn").addEventListener("click", goToLogOutPage);

// // Logout

// function logout() {
//   window.location.href = "logout.html";
// }

// document.getElementById("logoutBtn").addEventListener("click", logout);

/////////
// import { deleteStore } from "./delete.js";
// const source = "http://localhost:3001/allStores";

// // Function to check if the user is logged in
// function checkLoginStatus() {
//   return fetch("/protected")
//     .then((response) => response.json())
//     .then((data) => data.isLoggedIn);
// }

// // Function to create and append the update and delete buttons if logged in
// function appendButtonsIfLoggedIn(store, storeContainer) {
//   checkLoginStatus().then((isLoggedIn) => {
//     if (isLoggedIn) {
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

//       storeContainer.appendChild(deleteBtn);
//       storeContainer.appendChild(updateButton);
//     }
//   });
// }

// // Fetch and display stores
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

//       storeContainer.appendChild(storeName);
//       storeContainer.appendChild(storeUrl);

//       // Append buttons if user is logged in
//       appendButtonsIfLoggedIn(store, storeContainer);

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

// // function goToLogoutPage() {
// //   window.location.href = "logout.html";
// // }

// // document.getElementById("LogOutBtn").addEventListener("click", goToLogoutPage);

// // logout;
// // function logout() {
// //   // Send a request to the server to clear the authentication cookie
// //   fetch("http://localhost:3001/logout", { method: "GET" })
// //     .then((response) => {
// //       // Check if the logout was successful based on the server's response
// //       if (response.ok) {
// //         // If logout was successful, redirect to logout.html or login page as needed
// //         window.location.href = "logout.html";
// //       } else {
// //         // Handle cases where the logout wasn't successful
// //         alert("Logout failed. Please try again.");
// //       }
// //     })
// //     .catch((error) => {
// //       // Handle any errors that occurred during the fetch
// //       console.error("Logout error:", error);
// //       alert("Logout error. Please check your connection and try again.");
// //     });

// //   console.log("Hiiii");
// // }

// // document.getElementById("logoutBtn").addEventListener("click", logout);
