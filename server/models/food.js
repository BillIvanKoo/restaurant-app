const mongoose = require('mongoose');
var Schema = mongoose.Schema

const foodSchema = new Schema({
  menu: String,
  name: String,
  description: String,
  price: String,
  category: String,
  created_at : { type: Date, required: false, default: Date.now},
  vote_up: { type: Number, required: false, default: 0}
})

let Food = mongoose.model('Food', foodSchema)

module.exports = Food;