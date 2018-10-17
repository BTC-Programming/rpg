const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TestSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    max: 20
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    max: 20
  },
  birthdate: {
    type: Date
  },
  locale: {
    type: String,
    trim: true,
    max: 60
  },
  favcolor: {
    type: String,
    trim: true,
    max: 20
  },
  favsong: {
    type: String,
    trim: true,
    max: 50
  },
  favanimal: {
    type: String,
    trim: true,
    max: 20
  }
});

module.exports = Test = mongoose.model('test', TestSchema);
