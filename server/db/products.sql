-- DROP DATABASE IF EXISTS products;
-- CREATE DATABASE products;

-- \c products;

-- Index on product and features table
CREATE INDEX idx_product_id ON product (id);
CREATE INDEX idx_features_product_id ON features (product_id);

-- Index on styles table
CREATE INDEX idx_styles_product_id ON styles (product_id);

-- Index on photos table
CREATE INDEX idx_photos_style_id ON photos (style_id);

-- Index on skus table
CREATE INDEX idx_skus_style_id ON skus (style_id);

-- Index on related_products table
CREATE INDEX idx_related_products_current_product_id ON related_products (current_product_id);

CREATE TABLE product (
  id SERIAL PRIMARY KEY NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  slogan VARCHAR(300) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,
  default_price INT NOT NULL
);

CREATE TABLE related_products (
  id SERIAL PRIMARY KEY,
  current_product_id INT REFERENCES product(id),
  related_product_id INT NOT NULL
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT REFERENCES product(id),
  style_name VARCHAR(255) NOT NULL,
  sale_price VARCHAR(100),
  original_price NUMERIC(15, 2) NOT NULL,
  default_style BOOLEAN
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY NOT NULL,
  style_id INT REFERENCES styles(id),
  photo_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY NOT NULL,
  style_id INT REFERENCES styles(id),
  size VARCHAR(10),
  quantity INT NOT NULL
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT REFERENCES product(id),
  feature VARCHAR(100),
  value VARCHAR(50)
);

