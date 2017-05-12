const mongoose = require('mongoose');
var Schema = mongoose.Schema

const userSchema = new Schema({
  username: {type: String, require: false},
  password: {type: String, require: true, minlength: 5},
  email: {type: String, require: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email']},
  role: {type: String, require: false}
})

let User = mongoose.model('User', userSchema)

module.exports = User;