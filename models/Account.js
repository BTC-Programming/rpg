const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AccountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  username: {
    type: String,
    required: true,
    trim: true,
    max: 20
  },
  indexname: {
    type: String,
    lowercase: true,
    trim: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  locale: {
    type: String,
    trim: true,
    max: 60
  },
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: 'character'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Account = mongoose.model('account', AccountSchema);
