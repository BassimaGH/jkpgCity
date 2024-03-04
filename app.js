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


app.delete("/stores/:name", verifyAdmin, async (req, res) => {
  const { name } = req.params;
  try {
    await Db.deleteStoreById(name);
    res.status(204).send(); 
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
// filter district
app.get("/allStores/:district", async (req, res) => {
  const storDistrict = req.params.district;

  try {
    const stores = await Db.getStoresByDistrict(storDistrict);
    if (stores.length > 0) {
      res.json(stores);
    } else {
      res.status(404).json({ message: "Stores not found in this district" });
    }
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ error: "Error fetching stores." });
  }
});

//Get all shoppa sub-categories stores
app.get("/:category/:subCategories", async (req, res) => {
  const { category, subCategories } = req.params;
  const stores = await Db.getAllSubCategories(category, subCategories);
  res.json(stores);
});

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

//POST REQUESTS

//post new store
app.post("/store/addStore", express.json(), async (req, res) => {
  const store = req.body;
  console.log(store);
  const newStore = await Db.createNewStore(store);
  res.json(newStore);
});

app.get("/stores/filter", async (req, res) => {
  const { minRating } = req.query;

  if (!minRating || isNaN(minRating)) {
    return res.status(400).json({ error: "Minimum rating is required and must be a number." });
  }

  try {
    const filteredStores = await Db.filterStoresByRating(parseFloat(minRating));
    res.json(filteredStores);
  } catch (error) {
    console.error("Error filtering stores by rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const startServer = async () => {
  Db = new DbClass();
  await Db.init();
  await Db.setup(storeJson);

  app.listen(3001, () => {
    console.log("Example app listening on port 3001!");
  });
};

startServer();
