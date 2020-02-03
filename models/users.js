// const db = require('./db');
const mongoose = require('mongoose');

var PositionSchema = mongoose.Schema(
  {
    latitude: Number,
    longitude: Number
  }
)

const userSchema = mongoose.Schema({
  first_name: String,
  email: String,
  historiquePosition:[PositionSchema]
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;