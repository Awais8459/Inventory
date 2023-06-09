const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csvtojson");
const Product = require('../Models/productModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

router.route("/uploadAll").post(upload.single("csvFile"), async (req, res) => {
  try {
    const jsonArray = await csv().fromFile(req.file.path);
    await Product.insertMany(jsonArray);
    return res.json("added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
