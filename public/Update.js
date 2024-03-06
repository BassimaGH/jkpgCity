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

  // Adjusted to match your backend endpoint
  const url = `http://localhost:3001/allStores/${encodeURIComponent(
    storeName
  )}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Assuming 'data' is the store's details
      // Populate the form fields with the data
      document.getElementById("storeName").value = data[0].name || "";
      document.getElementById("storeURL").value = data[0].url || "";
      document.getElementById("storeDistrict").value = data[0].district || "";
      document.getElementById("storeCategories").value =
        data[0].categories || "";
      document.getElementById("storeSubCategory").value =
        data[0].subCategory || "";
      document.getElementById("openingTime").value = data[0].openingTime || "";
      document.getElementById("closingTime").value = data[0].closingTime || "";
      document.getElementById("storeRating").value = data[0].rating || "";
      document.getElementById("storePhone").value = data[0].phone || "";
      document.getElementById("storeEmail").value = data[0].email || "";
    })
    .catch((error) => console.error("Error fetching store details:", error));
}

// Call the function to populate the form when the page is loaded
document.addEventListener("DOMContentLoaded", fetchAndPopulateStoreDetails);
