const mongoose = require('mongoose');
var Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  role: String
})

let User = mongoose.model('User', userSchema)

module.exports = User;