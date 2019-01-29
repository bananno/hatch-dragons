const mongoose = require('mongoose');

const HabitatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameModel: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
  },
});

const Habitat = mongoose.model('Habitat', HabitatSchema);
module.exports = Habitat;
