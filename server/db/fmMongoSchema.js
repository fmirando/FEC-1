const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/atelier');

const ProductsSchema = mongoose.Schema({
  product_id: Number,
});

const ProductSchema = mongoose.Schema({
  name: { stype: String, required: true },
  slogan: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  default_price: { type: Number, required: true },
});

const StylesSchema = mongoose.Schema({
  style_name: String,
  sale_price: Number,
  photos: Array,
});
