/* eslint-disable prefer-destructuring */
const axios = require('axios');
const models = require('../models');

// module.exports = {
//   // get: (res, res) => {
//   //   const { id } = req.query;
//   //   models.productsModel.getProduct(id)
//   //     .then((results) => {
//   //       console.log(results);
//   //     })
//   //     .catch((err) => {

//   //     });
//   // },
//   getStyles: (req, res) => {
//     const { id } = req.query;
//     models.productsModel.getStyles(id)
//       .then((results) => {
//         console.log('Styles >>>> ', { results });
//         res.status(200).json(results);
//       })
//       .catch((err) => {
//         console.error('Controller: unable to retrieve styles...', err);
//       });
//   },
//   getRelated: (req, res) => {

//   }
// };

const { ATELIER_API, API_TOKEN } = process.env;

module.exports = {
  get: (req, res) => {
    axios.get(`${ATELIER_API}/products/${req.params.product_id}`, {
      headers: {
        authorization: API_TOKEN,
      },
    })
      .then(({ data }) => res.json(data))
      .catch((err) => {
        console.log('There was a problem in the server retrieving product data: ', err);
        res.sendStatus(404);
      });
  },
  getStyles: (req, res) => {
    const { product_id } = req.params;
    console.log('Req.params.product_id: ', req.params);
    models.productsModel.getStyles(product_id)
      .then((results) => {
        console.log('Styles >>>> ', results[0].result);
        // TODO: reformat styles data before sending back to client
        // I shouldn't have to change anything on the client side
        res.status(200).send(results[0].result);
      })
      .catch((err) => {
        console.error('Controller: unable to retrieve styles...', err);
      });
  },

  getRelated: (req, res) => {
    const productId = req.params.product_id;
    axios.get(`${ATELIER_API}/products/${productId}/related`, { headers: { authorization: API_TOKEN } })
      .then(({ data }) => {
        const newArr = Promise.all(data.map((id) => axios.get(`${ATELIER_API}/products/${id}`, { headers: { authorization: API_TOKEN } }).then((prod) => prod.data)));
        return newArr;
      })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.error('Unable to retrieve Item data: ', err);
        res.sendStatus(404);
      });
  },
};

  // My styles function
