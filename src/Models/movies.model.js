const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String
  },
  genre: String,
  image_url: {
      type: String
  },
  description: {
    type: String
  }
});
module.exports = mongoose.model('movies', movieSchema);