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
        return response.text();
      })
      .then((data) => {
        console.log(data); // Log server response
        //alert(data); // Show success message
        window.location.replace("index.html");
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        alert("There was an error creating the store");
      });
  });
