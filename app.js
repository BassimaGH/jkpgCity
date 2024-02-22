require("dotenv").config();

const express = require("express");
const DbClass = require("./db.js");
const storeJson = require("./stores.json");
const cookieParser = require("cookie-parser");
const app = express();
let Db = null;

app.use(cookieParser());

//GET REQUESTS
//Get all stores
app.get("/allStores", async (req, res) => {
  const stores = await Db.getAllStores(storeJson);
  res.json(stores);
});

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
//////
//filter
// app.get("/allStores/:district", async (req, res) => {
//   const storDistrict = req.params.district;

//   try {
//     const stores = await Db.getStoresByDistrict(storDistrict);
//     if (storDistrict.length > 0) {
//       res.json(storDistrict);
//     } else {
//       res.status(404).json({ message: "Store not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching store:", error);
//     res.status(500).json({ error: "Error fetching store." });
//   }
// });

///
app.get("/allStores/:district", async (req, res) => {
  const storDistrict = req.params.district;

  try {
    const stores = await Db.getStoresByDistrict(storDistrict);
    if (stores.length > 0) {
      // Check if any stores were found
      res.json(stores); // Return the stores
    } else {
      res.status(404).json({ message: "Stores not found in this district" }); // No stores found for the district
    }
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ error: "Error fetching stores." });
  }
});

///////
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
