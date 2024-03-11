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
    const res = await this.client.query(
      "SELECT * FROM public.stores ORDER BY name ASC"
    );
    return res.rows;
  }

  async getAllCategories(categories) {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1`,
      [categories]
    );
    return res.rows;
  }

  async getSubcategoriesByCategory(categories) {
    try {
      const res = await this.client.query(
        `
      SELECT DISTINCT subCategory
      FROM public.stores
      WHERE categories = $1;
    `,
        [categories]
      );
      // Extract subcategory values from the query result
      // const subcategories = res.map((row) => row.subCategory);
      // return subcategories;
      return res.rows;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      throw error;
    }
  }

  async filterStoresByRating(minRating) {
    try {
      const res = await this.client.query(
        "SELECT * FROM public.stores WHERE rating >= $1",
        [minRating]
      );
      return res.rows;
    } catch (error) {
      console.error("Error filtering stores by rating:", error);
      return [];
    }
  }

  async deleteStoreById(name) {
    try {
      await this.client.query("DELETE FROM public.stores WHERE name = $1", [
        name,
      ]);
    } catch (error) {
      throw new Error("Error deleting store: " + error.message);
    }
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
  }

  async getAllSubCategories(categories, subCategory) {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE categories = $1 AND subCategory = $2`,
      [categories, subCategory]
    );
    return res.rows;
  }

  async getStoreByName(storeName) {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE name = $1 LIMIT 1;`,
      [storeName]
    );
    return res.rows;
  }

  // filter
  async getStoresByDistrict(district) {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE district = $1`,
      [district]
    );
    return res.rows;
  }

  async getStoreByName(storeName) {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE name = $1 LIMIT 1;`,
      [storeName]
    );
    return res.rows;
  }

  async updateStore(
    url,
    district,
    categories,
    subcategory,
    openingtime,
    closingtime,
    rating,
    phone,
    email,
    name
  ) {
    const res = await this.client.query(
      `UPDATE public.stores
     SET url = $1,
        district = $2,
        categories = $3,
        subcategory = $4,
        openingtime = $5,
        closingtime = $6,
        rating = $7,
        phone = $8,
        email = $9
    WHERE name = $10
    RETURNING *;
  `,
      [
        url,
        district,
        categories,
        subcategory,
        openingtime,
        closingtime,
        rating,
        phone,
        email,
        name,
      ]
    );
    return res.rows;
  }
}

module.exports = Db;
