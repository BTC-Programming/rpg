const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CharacterSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    max: 12
  },
  indexname: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  descript: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Character = mongoose.model('character', CharacterSchema);
