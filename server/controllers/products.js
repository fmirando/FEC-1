/* eslint-disable camelcase */
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
    // axios.get(`${ATELIER_API}/products/${req.params.product_id}`, {
    //   headers: {
    //     authorization: API_TOKEN,
    //   },
    // })
    //   .then(({ data }) => {
    //     console.log('Controller: data >>>>: ', data);
    //     res.json(data);
    //   })
    //   .catch((err) => {
    //     console.log('There was a problem in the server retrieving product data: ', err);
    //     res.sendStatus(404);
    //   });

    // REFACTOR FOR DB
    const { product_id } = req.params;
    models.productsModel.getProduct(product_id)
      .then((result) => {
        const prodData = result[0];
        console.log('Controller: getting product data: ', result[0]);
        res.json(prodData);
      })
      .catch((err) => {
        console.error('Controller: Couldn\'t get product data...', err);
      });
  },
  getStyles: (req, res) => {
    const { product_id } = req.params;
    console.log('Req.params.product_id: ', req.params);
    models.productsModel.getStyles(product_id)
      .then((results) => {
        console.log('Styles >>>> ', results[0].result);
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

    // REFACTOR: GRABBING FROM DB NOW
    // models.productsModel.getRelated(productId)
    //   .then(() => {
    //     // TODO: retrieve an array of related product ids
    //     // promisify a new array
    //     // map: for each product id, call model function to get product data for each id
    //   })
    //   .catch((err) => {
    //     console.error('Controller: Couldn\'t retrieve related products...', err);
    //     res.sendStatus(400);
    //   });
  },
};

  // My styles function
