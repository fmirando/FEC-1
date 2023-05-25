require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: process.env.PORT,
  user: 'root',
  password: '',
  database: 'products',
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database :D');
  })
  .catch((err) => {
    console.error('Couldn\'t connect to PostgreSQL database :(', err);
  });

module.exports.client = client;
