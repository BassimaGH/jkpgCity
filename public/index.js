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
