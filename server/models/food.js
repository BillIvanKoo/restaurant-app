const mongoose = require('mongoose');
var Schema = mongoose.Schema

const foodSchema = new Schema({
  title: String,
  describe: String,
  urlImg: String,
  createdAt : { type: Date, required: false, default: Date.now},
  updatedAt : { type: Date, required: false, default: Date.now}
})

let Food = mongoose.model('Food', foodSchema)

module.exports = Food;