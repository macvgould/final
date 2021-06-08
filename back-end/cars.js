const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Create a scheme for items in the museum: a title and a path to an image.
const carSchema = new mongoose.Schema({
  make: String,
  price: String,
  model: String,
  status: String,
  color: String,
});

const Car = mongoose.model('Car', carSchema);


module.exports = {
  model: Car,
  routes: router,
}
