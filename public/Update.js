// function getStoreNameFromUrl() {
//   const queryParams = new URLSearchParams(window.location.search);
//   return decodeURIComponent(queryParams.get("storeName"));
// }

// const storeName = getStoreNameFromUrl();
// console.log(`Decoded Store Name: ${storeName}`); // Debugging

// async function fetchStoreData(storeName) {
//   // Properly encode the store name to handle spaces and special characters
//   const encodedStoreName = encodeURIComponent(storeName);
//   const response = await fetch(
//     `http://localhost:3001/stores/name/${encodedStoreName}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch store data");
//   }
//   const storeData = await response.json();
//   populateForm(storeData);
// }

// function populateForm(data) {
//   document.getElementById("storeName").value = data.name;
//   document.getElementById("storeURL").value = data.url;
//   document.getElementById("storeDistrict").value = data.district;
//   document.getElementById("storeCategories").value = data.categories;
//   document.getElementById("storeSubCategory").value = data.subCategory;
//   document.getElementById("openingTime").value = data.openingTime;
//   document.getElementById("closingTime").value = data.closingTime;
//   document.getElementById("storeRating").value = data.rating;
//   document.getElementById("storePhone").value = data.phone;
//   document.getElementById("storeEmail").value = data.email;
// }

// document
//   .getElementById("updateStoreForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const formData = {
//       name: document.getElementById("storeName").value,
//       url: document.getElementById("storeURL").value,
//       district: document.getElementById("storeDistrict").value,
//       categories: document.getElementById("storeCategories").value,
//       subCategory: document.getElementById("storeSubCategory").value,
//       openingTime: document.getElementById("openingTime").value,
//       closingTime: document.getElementById("closingTime").value,
//       rating: parseFloat(document.getElementById("storeRating").value),
//       phone: document.getElementById("storePhone").value,
//       email: document.getElementById("storeEmail").value,
//     };

//     fetch(`http://localhost:3001/store/updateStore`, {
//       // Adjust the URL as necessary
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.text();
//       })
//       .then((data) => {
//         console.log(data);
//         window.location.replace("index.html");
//       })
//       .catch((error) => {
//         console.error("There was a problem with your fetch operation:", error);
//         alert("There was an error updating the store");
//       });
//   });

// // Example call to fetchStoreData, you need to replace 'storeNameHere' with the actual store name or pass it dynamically
// // fetchStoreData("${encodedStoreName}`");

// This function parses the query string and returns the value for a given parameter name
function getQueryStringValue(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// This function fetches store details and populates the form
function fetchAndPopulateStoreDetails() {
  const storeName = getQueryStringValue("storeName");
  if (!storeName) {
    console.error("Store name is required");
    return;
  }

  const url = `http://localhost:3001/store/${encodeURIComponent(storeName)}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Assuming the response has the store details directly
      document.getElementById("storeName").value = data.name || "";
      document.getElementById("storeURL").value = data.url || "";
      document.getElementById("storeDistrict").value = data.district || "";
      document.getElementById("storeCategories").value = data.categories || "";
      document.getElementById("storeSubCategory").value =
        data.subCategory || "";
      document.getElementById("openingTime").value = data.openingTime || "";
      document.getElementById("closingTime").value = data.closingTime || "";
      document.getElementById("storeRating").value = data.rating || "";
      document.getElementById("storePhone").value = data.phone || "";
      document.getElementById("storeEmail").value = data.email || "";
    })
    .catch((error) => console.error("Error fetching store details:", error));
}

// Call the function to populate the form when the page is loaded
document.addEventListener("DOMContentLoaded", fetchAndPopulateStoreDetails);
