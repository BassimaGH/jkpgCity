require("dotenv").config();
const express = require("express");
const DbClass = require("./db.js");
const storeJson = require("./stores.json");
const app = express();
let Db = null;

// app.get("/", async (req, res) => {
//   res.json({ success: true });
// });

// app.get("/", async (req, res) => {
//   const stores = await Db.getAllStores();
//   res.json(stores);
// });

app.get("/shoppa", async (req, res) => {
  const shoppaStores = await Db.getAllShoppaStores();
  res.json(shoppaStores);
});

const startServer = async () => {
  Db = new DbClass();
  await Db.init();
  await Db.setup(storeJson);
  // await Db.getAllStores();

  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
  });
};

startServer();
