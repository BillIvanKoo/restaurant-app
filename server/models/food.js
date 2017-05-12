const mongoose = require('mongoose');
var Schema = mongoose.Schema

const foodSchema = new Schema({
  img: String,
  name: String,
  description: String,
  price: String,
  category: String,
  created_at : Date
})

let Food = mongoose.model('Food', foodSchema)

module.exports = Food;