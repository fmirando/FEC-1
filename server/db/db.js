require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: process.env.DB_PORT,
  user: 'frankmirando',
  password: '',
  database: 'products',
});

pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database :D');
  })
  .catch((err) => {
    console.error('Couldn\'t connect to PostgreSQL database :(', err);
  });

module.exports = pool;
