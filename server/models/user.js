const mongoose = require('mongoose');
var Schema = mongoose.Schema

const userSchema = new Schema({
  username: {type: String, require: true},
  password: {type: String, require: true},
  email: {type: String, require: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email']},
  role: {type: String, require: false}
})

let User = mongoose.model('User', userSchema)

module.exports = User;