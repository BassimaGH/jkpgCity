document
  .getElementById("createStoreForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("storeName").value,
      url: document.getElementById("storeURL").value,
      district: document.getElementById("storeDistrict").value,
      categories: document.getElementById("storeCategories").value,
      subCategory: document.getElementById("storeSubCategory").value,
      openingTime: document.getElementById("openingTime").value,
      closingTime: document.getElementById("closingTime").value,
      rating: parseFloat(document.getElementById("storeRating").value),
      phone: document.getElementById("storePhone").value,
      email: document.getElementById("storeEmail").value,
    };
    console.log("from client");
    console.log(formData);

    fetch("http://localhost:3001/store/addStore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Store Created successfully!");
        return response.text();
      })
      .then((data) => {
        console.log(data); // Log server response
        window.location.replace("index.html");
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        alert("There was an error creating the store");
      });
  });

document
  .getElementById("updateStoreForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const storeName = document.getElementById("storeName").value;
    const storeDetails = {
      url: document.getElementById("storeURL").value,
      district: document.getElementById("storeDistrict").value,
      categories: document.getElementById("storeCategories").value,
      subcategory: document.getElementById("storeSubCategory").value, // Note the lowercase 'c'
      openingtime: document.getElementById("openingTime").value, // Note the lowercase 't'
      closingtime: document.getElementById("closingTime").value, // Note the lowercase 't'
      rating: parseFloat(document.getElementById("storeRating").value), // Ensure it's a number
      phone: document.getElementById("storePhone").value,
      email: document.getElementById("storeEmail").value,
    };

    const updateUrl = `http://localhost:3001/allStores/${encodeURIComponent(
      storeName
    )}`;
    fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeDetails),
    })
      .then((response) => {
        if (response.ok) {
          alert("Store updated successfully!");
          // Optionally, redirect or refresh the page. For instance, you might want to go back to a list view.
          window.location.href = "index.html";
        } else {
          // It's a good practice to handle HTTP error statuses
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
