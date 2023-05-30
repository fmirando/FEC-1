// This models file will interact with DB
const pool = require('../db/db');

module.exports = {
  // Retrieve one product
  getProduct: (productId) => {
    const query = {
      text: `
      SELECT
      p.id,
      p.product_name AS name,
      p.slogan,
      p.description AS description,
      p.category,
      p.default_price,
      json_agg(
          jsonb_build_object(
              'feature', f.feature,
              'value', f.value
          )
      ) AS features
      FROM
          product AS p
      LEFT JOIN
          features AS f ON p.id = f.product_id
      WHERE
          p.id = $1
      GROUP BY
      p.id;
      `,
      values: [productId],
    };
    return pool.query(query)
      .then((res) => {
        console.log(res.rows);
        return res.rows;
      })
      .catch((err) => {
        console.error('Couldn\'t retrieve product...', err);
        throw err;
      });
  },
  getRelatedProducts: (productId) => {
    const query = {
      text: `
      SELECT *
      FROM related_products
      WHERE current_product_id = $1
      `,
      value: [productId],
    };
    return pool.query(query)
      .then((res) => {
        console.log(res.rows);
        return res.rows;
      })
      .catch((err) => {
        console.error('Couldn\'t retrieve related products...', err);
        throw err;
      });
  },
  getStyles: (productId) => {
    const query = {
      // Fix later: this query wraps the data in an uneccessary object
      text: `
      SELECT
      jsonb_build_object(
          'product_id', p.id,
          'results', jsonb_agg(
              jsonb_build_object(
                  'style_id', s.id,
                  'name', s.style_name,
                  'original_price', s.original_price,
                  'sale_price', s.sale_price,
                  'default?', s.default_style,
                  'photos', (
                      SELECT jsonb_agg(
                          jsonb_build_object(
                              'thumbnail_url', ph.thumbnail_url,
                              'url', ph.photo_url
                          )
                      )
                      FROM photos AS ph
                      WHERE ph.style_id = s.id
                  ),
                  'skus', (
                      SELECT jsonb_object_agg(
                          sk.id::text,
                          jsonb_build_object(
                              'quantity', sk.quantity,
                              'size', sk.size
                          )
                      )
                      FROM skus AS sk
                      WHERE sk.style_id = s.id
                  )
              )
          )
      ) AS result
      FROM
          product AS p
      JOIN
          styles AS s ON p.id = s.product_id
      WHERE
          p.id = $1
      GROUP BY
      p.id;
      `,
      values: [productId],
    };
    return pool.query(query)
      .then((res) => {
        console.log('Model: Styles: ', res.rows);
        return res.rows;
      })
      .catch((err) => {
        console.error('Couldn\'t retrieve styles...', err);
        throw err;
      });
  },
  getFeatures: (styleId) => {
    const query = {
      text: `
      SELECT *
      FROM features
      WHERE style_id = $1
      `,
      value: [styleId],
    };
    return pool.query(query)
      .then((res) => {
        console.log('Features: ', res.rows);
        return res.rows;
      })
      .catch((err) => {
        console.error('Couldn\'t retrieve features...');
        throw err;
      });
  },
};

// SELECT
//     p.id,
//     p.product_name AS name,
//     p.slogan,
//     p.description AS description,
//     p.category,
//     p.default_price,
//     json_agg(
//         jsonb_build_object(
//             'feature', f.feature,
//             'value', f.value
//         )
//     ) AS features
// FROM
//     product AS p
// LEFT JOIN
//     features AS f ON p.id = f.product_id
// WHERE
//     p.id = 40344
// GROUP BY
//     p.id;