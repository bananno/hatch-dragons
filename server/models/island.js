const mongoose = require('mongoose');

const IslandSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  size: {
    type: Number,
    default: 1,
  }
});

const Island = mongoose.model('Island', IslandSchema);
module.exports = Island;
