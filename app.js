require("dotenv").config();

const express = require("express");
const DbClass = require("./db.js");
const storeJson = require("./stores.json");
const cookieParser = require("cookie-parser");
const app = express();
let Db = null;

app.use(cookieParser());
app.use(express.json());

// GET REQUESTS
// Get all stores
app.get("/allStores", async (req, res) => {
  const stores = await Db.getAllStores(storeJson);
  res.json(stores);
});

// app.get("/allStores/:name", async (req, res) => {
//   const storeName = req.params.name;
//   const stores = await Db.getStoreByName(storeName);
//   if (stores.length > 0) {
//     res.json(stores);
//   } else {
//     res.status(404).json({ message: "Store not found" });
//   }
// });

///newww
app.get("/allStores/:name", async (req, res) => {
  const storeName = req.params.name;
  try {
    const stores = await Db.getStoreByName(storeName);
    if (stores.length > 0) {
      res.json(stores);
    } else {
      res.status(404).json({ message: "Store not found" });
    }
  } catch (error) {
    console.error("Error fetching store:", error);
    res.status(500).json({ error: "Error fetching store." });
  }
});
///newww

//Get all Shoppa
app.get("/shoppa", async (req, res) => {
  const stores = await Db.getAllShoppaStores();
  res.json(stores);
});

//Get all Ata
app.get("/ata", async (req, res) => {
  const stores = await Db.getAllAtaStores();
  res.json(stores);
});

//Get all Upplev
app.get("/upplev", async (req, res) => {
  const stores = await Db.getAllUpplevStores();
  res.json(stores);
});

//Get all ma bra
app.get("/mabra", async (req, res) => {
  const stores = await Db.getAllMabraStores();
  res.json(stores);
});

//Get all sova
app.get("/sova", async (req, res) => {
  const stores = await Db.getAllSovaStores();
  res.json(stores);
});

//update
app.put("/allStores/:name", async (req, res) => {
  console.log("Request body:", req.body); // Log the request body
  const storeName = req.params.name;
  const {
    url,
    district,
    categories,
    subCategory,
    openingTime,
    closingTime,
    rating,
    phone,
    email,
  } = req.body;

  try {
    // Pass the parameters in the correct order
    const updateResult = await Db.updateStore(
      url,
      district,
      categories,
      subCategory,
      openingTime,
      closingTime,
      rating,
      phone,
      email,
      storeName
    );

    // Check if any rows were updated
    if (updateResult.length > 0) {
      console.log(`Store '${storeName}' updated successfully.`, updateResult);
      res.json(updateResult[0]); // Assuming you want to return the first (and should be only) updated record
    } else {
      res.status(404).json({ message: "Store not found or update failed" });
    }
  } catch (error) {
    console.error("Error updating store:", error);
    res.status(500).json({
      error: "Error updating store. Please check server logs for more details.",
    });
  }
});

// app.put("/allStores/:name", async (req, res) => {
//   const storeName = req.params.name;
//   const storeUpdates = req.body;

//   try {
//     // Assuming updateStore either returns a success message or the updated store object
//     const updateResult = await Db.updateStore(storeName, storeUpdates);

//     if (updateResult) {
//       console.log(`Store '${storeName}' updated successfully.`, updateResult);
//       res.json(updateResult);
//     } else {
//       res.status(404).json({ message: "Store not found or update failed" });
//     }
//   } catch (error) {
//     console.error("Error updating store:", error);
//     res.status(500).json({
//       error: "Error updating store. Please check server logs for more details.",
//     });
//   }
// });

app.get("/login", async (req, res) => {
  const { username, password } = req.query;
  if (username === "bassima" && password === "12345") {
    res.cookie("token", "super-secret-cookie", { httpOnly: true });
    res.send("login worked");
  } else {
    res.status(401).send("unauthorized");
  }
});

app.get("/protected", async (req, res) => {
  const { token } = req.cookies;

  if (token === "super-secret-cookie") {
    res.send("protected route!!");
  } else {
    res.status(401).send("unauthorized");
  }
});

const startServer = async () => {
  Db = new DbClass();
  await Db.init();
  await Db.setup(storeJson);

  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
  });
};

startServer();
