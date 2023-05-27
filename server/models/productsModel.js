// This models file will interact with DB
const pool = require('../db/db');

module.exports = {
  // Retrieve one product
  getProduct: (productId) => {
    const query = {
      text: `
      SELECT *
      FROM product
      WHERE id = $1
      `,
      value: [productId],
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
    // Future optimization: combine queries for styles, photos and skus
    // to minimize number of model functions
    const query = {
      text: `
      SELECT
      p.id AS product_id,
      json_agg(
          jsonb_build_object(
              'style_id', s.id,
              'name', s.style_name,
              'original_price', s.original_price,
              'sale_price', s.sale_price,
              'default?', s.default_style,
              'photos', (
                  SELECT json_agg(
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
                      sk.size,
                      jsonb_build_object(
                          'quantity', sk.quantity,
                          'size', sk.size
                      )
                  )
                  FROM skus AS sk
                  WHERE sk.style_id = s.id
              )
          )
      ) AS results
      FROM
      product AS p
      JOIN
      styles AS s ON p.id = s.product_id
      WHERE
      p.id = $1
      GROUP BY
      p.id;
      `,
      value: [productId],
    };
    return pool.query(query)
      .then((res) => {
        console.log('Styles: ', res.rows);
        return res.rows;
      })
      .catch((err) => {
        console.err('Couldn\'t retrieve styles...', err);
        throw err;
      });
  },
  // getPhotos: (styleId) => {
  //   const query = {
  //     text: `
  //     SELECT *
  //     FROM photos
  //     WHERE style_id = $1
  //     `,
  //     value: [styleId],
  //   };
  //   return pool.query(query)
  //     .then((res) => {
  //       console.log('Photos: ', res.rows);
  //       return res.rows;
  //     })
  //     .catch((err) => {
  //       console.error('Couldn\'t retrieve photos...');
  //       throw err;
  //     });
  // },
  // getSkus: (styleId) => {
  //   const query = {
  //     text: `
  //     SELECT *
  //     FROM skus
  //     WHERE style_id = $1
  //     `,
  //     value: [styleId],
  //   };
  //   return pool.query(query)
  //     .then((res) => {
  //       console.log('Skus: ', res.rows);
  //       return res.rows;
  //     })
  //     .catch((err) => {
  //       console.error('Couldn\'t retrieve skus...');
  //       throw err;
  //     });
  // },
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

// explain analyze
// SELECT
//     p.id AS product_id,
//     json_agg(
//         jsonb_build_object(
//             'style_id', s.id,
//             'name', s.style_name,
//             'original_price', s.original_price,
//             'sale_price', s.sale_price,
//             'default?', s.default_style,
//             'photos', (
//                 SELECT json_agg(
//                     jsonb_build_object(
//                         'thumbnail_url', ph.thumbnail_url,
//                         'url', ph.photo_url
//                     )
//                 )
//                 FROM photos AS ph
//                 WHERE ph.style_id = s.id
//             ),
//             'skus', (
//                 SELECT jsonb_object_agg(
//                     sk.id::text,
//                     jsonb_build_object(
//                         'quantity', sk.quantity,
//                         'size', sk.size
//                     )
//                 )
//                 FROM skus AS sk
//                 WHERE sk.style_id = s.id
//             )
//         )
//     ) AS results
// FROM
//     product AS p
// JOIN
//     styles AS s ON p.id = s.product_id
// WHERE
//     p.id = 1
// GROUP BY
//     p.id;

