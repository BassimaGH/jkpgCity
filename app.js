require('dotenv').config();

const express = require("express");
const DbClass = require("./db.js");
const storeJson = require("./stores.json");
const cookieParser = require('cookie-parser')
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

//Get all shoppa sub-categories stores
app.get("/shoppa/apparel", async (req, res) => {
  const stores = await Db.getAllApparelStores();
  res.json(stores);
});

app.get("/shoppa/electronics", async (req, res) => {
  const stores = await Db.getAllElectronicsStores();
  res.json(stores);
});

app.get("/shoppa/health_and_beauty", async (req, res) => {
  const stores = await Db.getAllHealthandBeautyStores();
  res.json(stores);
});

app.get("/shoppa/grocery", async (req, res) => {
  const stores = await Db.getAllGroceryStores();
  res.json(stores);
});

app.get("/shoppa/home_and_decor", async (req, res) => {
  const stores = await Db.getAllHomeandDecorStores();
  res.json(stores);
});

//Get all Äta sub-categories stores
app.get("/ata/cafes", async (req, res) => {
  const stores = await Db.getAllCafesStores();
  res.json(stores);
});

app.get("/ata/fast_food", async (req, res) => {
  const stores = await Db.getAllFastFoodtores();
  res.json(stores);
});

app.get("/ata/restaurants", async (req, res) => {
  const stores = await Db.getAllRestaurantsstores();
  res.json(stores);
});

app.get("/ata/fine_dining", async (req, res) => {
  const stores = await Db.getAllFineDiningstores();
  res.json(stores);
});

//Get all Upplev sub-categories stores
app.get("/upplev/entertainment_and_activities", async (req, res) => {
  const stores = await Db.getAllEntertainmentandActivitiesstores();
  res.json(stores);
});

app.get("/upplev/museums_and_culture", async (req, res) => {
  const stores = await Db.getAllMuseumsandCulturestores();
  res.json(stores);
});

//Get all Må bra sub-categories stores
app.get("/mabra/health_and_wellness", async (req, res) => {
  const stores = await Db.getAllHealthandWellnessstores();
  res.json(stores);
});

app.get("/mabra/beauty_salons_and_nail_bars", async (req, res) => {
  const stores = await Db.getAllBeautySalonsandNailBarsstores();
  res.json(stores);
});

//Get all Sova sub-categories stores
app.get("/sova/hotels", async (req, res) => {
  const stores = await Db.getAllHotelsstores();
  res.json(stores);
});


app.get('/login', async(req, res) => {
  const { username, password } = req.query;
  if (username === 'bassima' && password === '12345') {
    res.cookie('token', 'super-secret-cookie', { httpOnly: true });
    res.send('login worked');
  } else {
    res.status(401).send('unauthorized');
  }
})

app.get('/protected', async(req, res) => {
  const { token } = req.cookies;
  
  if (token === 'super-secret-cookie') {
    res.send('protected route!!')
  } else {
    res.status(401).send('unauthorized');
  }
})

const startServer = async () => {
  Db = new DbClass();
  await Db.init();
  await Db.setup(storeJson);

  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
  });
};

startServer();
