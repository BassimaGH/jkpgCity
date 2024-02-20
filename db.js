const { Client } = require("pg");

class Db {
  constructor() {
    this.client = new Client({
      user: "postgres",
      host: process.env.DB_HOST || "localhost",
      database: "postgres",
      password: "DMB123",
      port: 5432,
    });
  }

  async init() {
    await this.client.connect();
  }

  async setup(storeJson) {
    await this.client.query(`
      CREATE TABLE IF NOT EXISTS public.stores
      (
          id SERIAL NOT NULL,
          name text,
          url text,
          district text,
          categories text,
          subCategory text,
          openingTime text,
          closingTime text,
          rating integer,
          phone text,
          email text,
          CONSTRAINT stores_pkey PRIMARY KEY (id)
      );
    
    `);

    await this.client.query(`
      ALTER TABLE IF EXISTS public.stores OWNER to postgres;
    `);

    for (const store of storeJson) {
      const checkForStore = await this.client.query(
        `
        SELECT * FROM public.stores
        WHERE
         name = $1
        LIMIT 1
      `,
        [store.name]
      );

      console.log(checkForStore.rows);

      if (checkForStore.rows.length === 0) {
        await this.client.query(
          `
          INSERT INTO public.stores (name, url, district, categories, subCategory, openingTime, closingTime, rating, phone, email)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `,
          [
            store.name,
            store.url,
            store.district,
            store.categories,
            store.subCategory,
            store.openingTime,
            store.closingTime,
            store.rating,
            store.phone,
            store.email,
          ]
        );
      }
    }
  }

  async getAllStores() {
    const res = await this.client.query("SELECT * FROM public.stores");
    return res.rows;
  }

  async getAllShoppaStores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1`,
      ["Shoppa"]
    );
    return res.rows;
  }

  async getAllAtaStores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1`,
      ["\u00c4ta"]
    );
    return res.rows;
  }

  async getAllUpplevStores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1`,
      ["Upplev"]
    );
    return res.rows;
  }

  async getAllMabraStores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1`,
      ["M\u00e5 bra"]
    );
    return res.rows;
  }

  async getAllSovaStores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1`,
      ["Sova"]
    );
    return res.rows;
  }

  /* 
  
    SUB-CATEGORIES FILTER QUERIES
  
  */

  //(shoppa sub-categories)
  async getAllApparelStores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["Shoppa", "Apparel"]
    );
    return res.rows;
  }

  async getAllElectronicsStores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["Shoppa", "Electronics"]
    );
    return res.rows;
  }

  async getAllHealthandBeautyStores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["Shoppa", "Health and Beauty"]
    );
    return res.rows;
  }

  async getAllGroceryStores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["Shoppa", "Grocery"]
    );
    return res.rows;
  }

  async getAllHomeandDecorStores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["Shoppa", "Home and Decor"]
    );
    return res.rows;
  }

  // (Äta sub-categories)
  // we dont have a 'Bars and Pubs' in our data
  async getAllCafesStores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["\u00c4ta", "Caf\u00e9s"]
    );
    return res.rows;
  }
  
  async getAllFastFoodtores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["\u00c4ta", "Fast Food"]
    );
    return res.rows;
  }

  async getAllRestaurantsstores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["\u00c4ta", "Restaurants"]
    );
    return res.rows;
  }

  async getAllFineDiningstores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["\u00c4ta", "Fine Dining"]
    );
    return res.rows;
  }
  
  // (Upplev sub-categories)
  // we dont have a 'Cinemas and Theater' in our data
  async getAllEntertainmentandActivitiesstores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["Upplev", "Entertainment and Activities"]
    );
    return res.rows;
  }
  
  async getAllMuseumsandCulturestores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["Upplev", "Museums and Culture"]
    );
    return res.rows;
  }
  
  // (Må bra sub-categories)
  // we dont have a 'Barbers and Hair Salons' and 'Fitness Centers' in our data
  async getAllHealthandWellnessstores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["M\u00e5 bra", "Health and Wellness"]
    );
    return res.rows;
  }

  async getAllBeautySalonsandNailBarsstores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["M\u00e5 bra", "Beauty Salons and Nail Bars"]
    );
    return res.rows;
  }
  
  // (Sova sub-categories)
  async getAllHotelsstores() {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      ["Sova", "Hotels"]
    );
    return res.rows;
  }
}

module.exports = Db;
