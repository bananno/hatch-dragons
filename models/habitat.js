const mongoose = require('mongoose');

const HabitatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  island: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Island',
    required: true
  },
  gameModel: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  money: {
    type: Number,
    default: 0,
  },
});

const Habitat = mongoose.model('Habitat', HabitatSchema);
module.exports = Habitat;
