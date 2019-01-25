const mongoose = require('mongoose');

const DragonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  habitat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitat',
  },
  name: {
    type: String,
    required: true
  }
});

const Dragon = mongoose.model('Dragon', DragonSchema);
module.exports = Dragon;
