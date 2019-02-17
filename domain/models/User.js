var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  roles:[],
  updated_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', UserSchema);