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
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const jsonArray = await csv().fromFile(req.file.path);
    if (jsonArray.length === 0) {
      return res.status(400).json({ message: "Empty file" });
    }

    await Product.insertMany(jsonArray);
    return res.json("Added successfully");
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: "Error uploading file", error });
  }
});

module.exports = router;
