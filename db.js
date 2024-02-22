const { Client } = require("pg");

class Db {
  constructor() {
    this.client = new Client({
      user: "postgres",
      host: process.env.DB_HOST || "localhost",
      database: "postgres",
      password: "123DMB",
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

  async getStoreByName(storeName) {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE name = $1 LIMIT 1;`,
      [storeName]
    );
    return res.rows;
  }

  // update;
  //   async updateStore(
  //     url,
  //     district,
  //     categories,
  //     subCategory,
  //     openingTime,
  //     closingTime,
  //     rating,
  //     phone,
  //     email,
  //     name
  //   ) {
  //     const res = await this.client.query(
  //       `UPDATE public.stores
  //        SET url = $1,
  //           district = $2,
  //           categories = $3,
  //           subCategory = $4,
  //           openingTime = $5,
  //           closingTime = $6,
  //           rating = $7,
  //           phone = $8,
  //           email = $9
  //       WHERE name = $10

  //     `,
  //       [
  //         url,
  //         district,
  //         categories,
  //         subCategory,
  //         openingTime,
  //         closingTime,
  //         rating,
  //         phone,
  //         email,
  //         name,
  //       ]
  //     );
  //     return res.rows;
  //   }

  async getStoreByName(storeName) {
    const res = await this.client.query(
      `SELECT * FROM public.stores WHERE name = $1 LIMIT 1;`,
      [storeName]
    );
    return res.rows;
  }

  //update
  async updateStore(
    url,
    district,
    categories,
    subCategory,
    openingTime,
    closingTime,
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
        subCategory = $4,
        openingTime = $5,
        closingTime = $6,
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
        subCategory,
        openingTime,
        closingTime,
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
