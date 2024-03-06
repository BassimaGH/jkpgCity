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

document
  .getElementById("updateStoreForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data with keys matching the backend expectations
    const storeDetails = {
      name: document.getElementById("storeName").value,
      url: document.getElementById("storeURL").value,
      district: document.getElementById("storeDistrict").value,
      categories: document.getElementById("storeCategories").value,
      subCategory: document.getElementById("storeSubCategory").value,
      openingTime: document.getElementById("openingTime").value,
      closingTime: document.getElementById("closingTime").value,
      rating: parseFloat(document.getElementById("storeRating").value), // Ensuring it's a float
      phone: document.getElementById("storePhone").value,
      email: document.getElementById("storeEmail").value,
    };

    // Use the storeName from the form (or from the URL) for the PUT request URL
    const storeName = storeDetails.name;
    const updateUrl = `http://localhost:3001/allStores/${encodeURIComponent(
      storeName
    )}`;

    fetch(updateUrl, {
      method: "PUT", // Use PUT as the method for updating
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeDetails),
    })
      .then((response) => {
        if (response.ok) {
          alert("Store updated successfully!");
          // Optionally redirect or refresh the page, e.g., back to the stores list
          window.location.href = "index.html";
        } else {
          // Handle potential errors, like 404 or 500 from the backend
          response.json().then((data) => {
            alert(
              "Failed to update store: " + (data.message || "Unknown error")
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error updating store:", error);
        alert("Error updating store. Please check console for details.");
      });
  });
