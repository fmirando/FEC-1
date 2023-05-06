const axios = require('axios');

const { ATELIER_API, API_TOKEN } = process.env;

module.exports = {
  get: (req, res) => {
    axios.get(`${ATELIER_API}/products`, {
      headers: {
        authorization: API_TOKEN,
      },
    })
      .then(({ data }) => res.json(data))
      .catch((err) => {
        console.error('There was a problem in the server retrieving product data: ', err);
        res.sendStatus(404);
      });
  },

  getRelated: (req, res) => {
    const productId = req.params.product_id;
    axios.get(`${ATELIER_API}/products/${productId}/related`, { headers: { authorization: API_TOKEN } })
      .then(({ data }) => {
        const newArr = Promise.all(data.map((id) => axios.get(`${ATELIER_API}/products/${id}`, { headers: { authorization: API_TOKEN } }).then((prod) => prod.data)));
        return newArr;
      })
      .then((result) => res.send(result))
      .catch((err) => console.error('Unable to retrieve Item data: ', err));
  },

};