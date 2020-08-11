const mongoose = require('mongoose');

const DragonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  habitat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitat'
  },
  gameModel: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
    default: 0
  },
  timestamp: {
    type: Number,
  }
});

const Dragon = mongoose.model('Dragon', DragonSchema);
module.exports = Dragon;
