require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database :D');
  })
  .catch((err) => {
    console.error('Couldn\'t connect to PostgreSQL database :(', err);
  });

module.exports = pool;
