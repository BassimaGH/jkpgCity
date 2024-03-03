const source = "http://localhost:3001/allStores";

fetch(source)
  .then((response) => {
    return response.json();
  })
  .then((stores) => {
    console.log(stores);
    const storesList = document.getElementById("stores-list");
    stores.forEach((store) => {
      const storeContainer = document.createElement("div");
      storeContainer.classList.add("store-container");
      storeContainer.innerHTML = `
            <h3>${store.name}</h3>
            <p><strong>URL:</strong> ${store.url}</p>
          `;
      storesList.appendChild(storeContainer);
    });
  });

function goToCreatePage() {
  window.location.href = "create.html";
}

document
  .getElementById("createStoreBtn")
  .addEventListener("click", goToCreatePage);
