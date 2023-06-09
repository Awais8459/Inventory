const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../Models/productModel');

const productRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });



// Create a new product with image upload
productRoutes.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, quantity } = req.body;
    const imagePath = req.file ? req.file.filename : '';

    const product = new Product({
      name,
      price,
      description,
      quantity,
      imagePath
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Count the total products
productRoutes.get('/products/count', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all products
productRoutes.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single product by ID
productRoutes.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product by ID
productRoutes.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, quantity } = req.body;
    const imagePath = req.file ? req.file.filename : '';

    const updatedProduct = {
      name,
      price,
      description,
      quantity
    };

    if (req.file) {
      updatedProduct.imagePath = imagePath;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedProduct,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product by ID
productRoutes.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product's image file if it exists
    const imagePath = product.imagePath;
    if (imagePath) {
      const filePath = path.join(__dirname, '../public/uploads', imagePath);
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error('Failed to delete image file:', error);
        }
      });
    }
   
    // Delete the product from the database
    await Product.findByIdAndDelete(productId);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  productRoutes.post("/");
});



module.exports = productRoutes;