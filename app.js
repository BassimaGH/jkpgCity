require("dotenv").config();

const express = require("express");
const DbClass = require("./db.js");
const storeJson = require("./stores.json");
const cookieParser = require("cookie-parser");
const app = express();
let Db = null;

let p = __dirname + "/public";

console.log(p);

app.use(express.static(p));

app.use(cookieParser());
app.use(express.json());

// Middleware to verify if the user is logged in as an admin
const verifyAdmin = (req, res, next) => {
  const { token } = req.cookies;
  if (token === "super-secret-cookie") {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized: Admin access required" });
  }
};

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

//Get all categories stores
app.get("/store/:category", async (req, res) => {
  const { category } = req.params;
  const stores = await Db.getAllCategories(category);
  res.json(stores);
});

//filter

app.delete("/stores/:name", async (req, res) => {
  const { name } = req.params;
  try {
    await Db.deleteStoreById(name);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({ error: "Internal server error" });
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

////
app.get("/district", async (req, res) => {
  try {
    const db = new DbClass();
    await db.init();
    const district = await db.getDistricts();
    res.json(district);
  } catch (error) {
    console.error("Failed to get district:", error);
    res.status(500).send("Server error");
  }
});

/////

//Get all shoppa sub-categories stores
app.get("/store/:category/:subCategories", async (req, res) => {
  const { category, subCategories } = req.params;
  const stores = await Db.getAllSubCategories(category, subCategories);
  res.json(stores);
});

// Route to fetch subcategories based on the selected category
app.get("/subcategories/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const subcategories = await Db.getSubcategoriesByCategory(category);
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// update final
app.put("/allStores/:name", async (req, res) => {
  console.log("Request body:", req.body);
  const storeName = req.params.name;
  const {
    url,
    district,
    categories,
    subcategory,
    openingtime,
    closingtime,
    rating,
    phone,
    email,
  } = req.body;

  try {
    const updateResult = await Db.updateStore(
      url,
      district,
      categories,
      subcategory,
      openingtime,
      closingtime,
      rating,
      phone,
      email,
      storeName
    );

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

// Logout route
app.get("/logout", (req, res) => {
  // Clear the authentication cookie
  res.clearCookie("token");
  res.redirect("/index.html");
  // Optionally redirect the user to the login page or send a response
  // res.send("You have been logged out successfully");
  // For redirection to the login page, you can use res.redirect('/login');
});

app.get("/login", async (req, res) => {
  const { username, password } = req.query;
  if (username === "bassima" && password === "12345") {
    res.cookie("token", "super-secret-cookie", { httpOnly: true });
    // res.send("login worked");
    res.redirect("/");
  } else {
    res.status(401).send("unauthorized");
  }
});

app.get("/protected", async (req, res) => {
  const { token } = req.cookies;

  if (token === "super-secret-cookie") {
    res.json({ isLoggedIn: true });
  } else {
    // Modify here: send a single response indicating failure
    res.status(401).json({ isLoggedIn: false, message: "unauthorized" });
  }
});

//POST REQUESTS

//post new store
app.post("/store/addStore", async (req, res) => {
  const store = req.body;
  console.log(store);
  const newStore = await Db.createNewStore(store);
  console.log(newStore);
  res.json(newStore);
});

app.get("/stores/filter", async (req, res) => {
  const { minRating } = req.query;

  if (!minRating || isNaN(minRating)) {
    return res
      .status(400)
      .json({ error: "Minimum rating is required and must be a number." });
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
