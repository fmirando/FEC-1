/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
const models = require('../models');

module.exports = {
  get: (req, res) => {
    const { product_id } = req.params;
    models.productsModel.getProduct(product_id)
      .then((result) => {
        const prodData = result[0];
        // console.log('Controller: getting product data: ', result[0]);
        res.json(prodData);
      })
      .catch((err) => {
        console.error('Controller: Couldn\'t get product data...', err);
      });
  },
  getStyles: (req, res) => {
    // ISSUE: some products (eg 12582) dont have styles data...
    const { product_id } = req.params;
    console.log('Req.params.product_id: ', req.params);
    models.productsModel.getStyles(product_id)
      .then((results) => {
        console.log('Styles >>>> ', results[0]);
        res.status(200).send(results[0].result);
      })
      .catch((err) => {
        console.error('Controller: unable to retrieve styles...', err);
      });
  },
  getRelated: (req, res) => {
    const productId = req.params.product_id;

    models.productsModel.getRelatedProducts(productId)
      .then((data) => {
        console.log('Controller: related data: ', data[0].related_product_ids);
        const ids = data[0].related_product_ids;
        const relatedData = Promise.all(ids.map((id) => models.productsModel.getProduct(id)
          .then((prod) => prod[0])));
        console.log('Controller: returning relatedData arr: ', relatedData);
        return relatedData;
      })
      .then((result) => {
        console.log('Controller: sending related data :) ', result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.error('Controller: Couldn\'t retrieve related products...', err);
        res.sendStatus(400);
      });
  },
};
