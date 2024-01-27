require("dotenv").config();
const express = require("express");
const DbClass = require("./db.js");
const storeJson = require("./stores.json");
const app = express();
let Db = null;

app.get("/setup", async (req, res) => {
  await Db.setup(storeJson);
  res.json({ success: true });
});

app.get("/", async (req, res) => {
  const stores = await Db.getAllStores();
  res.json(stores);
});

const startServer = async () => {
  Db = new DbClass();
  await Db.init();
  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
  });
};

startServer();
