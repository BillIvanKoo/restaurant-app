const mongoose = require('mongoose');
var Schema = mongoose.Schema

const foodSchema = new Schema({
  menu: String,
  name: String,
  description: String,
  price: String,
  vote_up: Number
})

let Food = mongoose.model('Food', foodSchema)

module.exports = Food;