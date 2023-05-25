-- DROP DATABASE IF EXISTS products;
-- CREATE DATABASE products;

-- \c products;

CREATE TABLE product (
  id SERIAL PRIMARY KEY NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  slogan VARCHAR(100) NOT NULL,
  prod_description VARCHAR(255) NOT NULL,
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
  sale_price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  default_style BOOLEAN
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY NOT NULL,
  style_id INT REFERENCES styles(id),
  photo_url VARCHAR(255) NOT NULL,
  thumbnail_url VARCHAR(255) NOT NULL
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY NOT NULL,
  style_id INT REFERENCES styles(id),
  size VARCHAR(10),
  quantity INT NOT NULL
);

