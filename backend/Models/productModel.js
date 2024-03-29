const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
  
  },
  price: {
    type: Number,
    
  },
  description: {
    type: String,

  },
  quantity: {
    type: Number,
    
  },
  imagePath: {
    type: String,
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;