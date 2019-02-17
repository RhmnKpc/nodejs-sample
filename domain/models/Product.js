var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  updated_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Product', ProductSchema);