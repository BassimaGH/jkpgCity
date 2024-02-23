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


  // CREATE STORE QUERY
  async createNewStore(store) {
    try {
      const res = await this.client.query(
        `INSERT INTO public.stores (name, url, district, categories, subCategory, openingTime, closingTime, rating, phone, email)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
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
      return res.rows[0];
    } catch (error) {
      console.error("Error inserting store into database:", error);
      throw error;
    }

  /* 
  
    SUB-CATEGORIES FILTER QUERIES
  
  */

  async getAllSubCategories(categories, subCategory) {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      [categories, subCategory]
    );
    return res.rows;

  }
}

module.exports = Db;
