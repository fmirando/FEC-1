\copy product (id, product_name, slogan, description, category, default_price) FROM '/Users/frankmirando/Desktop/Hack Reactor/SDC/csv sample data/SDC Application Data - Atelier Project (_Clean_ Data Set)-2/product.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

\copy related_products (id, current_product_id, related_product_id) FROM '/Users/frankmirando/Desktop/Hack Reactor/SDC/csv sample data/SDC Application Data - Atelier Project (_Clean_ Data Set)/related.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

\copy styles (id, product_id, style_name, sale_price, original_price, default_style) FROM '/Users/frankmirando/Desktop/Hack Reactor/SDC/csv sample data/SDC Application Data - Atelier Project (_Clean_ Data Set)-1/styles.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

\copy photos (id, style_id, photo_url, thumbnail_url) FROM '/Users/frankmirando/Desktop/Hack Reactor/SDC/csv sample data/SDC Application Data - Atelier Project (_Clean_ Data Set)/photos.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

\copy skus (id, style_id, size, quantity) FROM '/Users/frankmirando/Desktop/Hack Reactor/SDC/csv sample data/SDC Application Data - Atelier Project (_Clean_ Data Set)/skus.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';

\copy features (id, product_id, feature, value) FROM '/Users/frankmirando/Desktop/Hack Reactor/SDC/csv sample data/SDC Application Data - Atelier Project (_Clean_ Data Set)/features.csv' DELIMITER ',' CSV HEADER QUOTE '"' ESCAPE '''';