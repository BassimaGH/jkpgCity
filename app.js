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

//Update
app.put("/updateStore", async (req, res) => {
  const stores = req.body;
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

const startServer = async () => {
  Db = new DbClass();
  await Db.init();
  await Db.setup(storeJson);

  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
  });
};

startServer();
