const mongoose = require('mongoose');

const showsSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.String
  },
  theatreId: {
    type: mongoose.Schema.Types.String
  },
  datetime: {
      type: mongoose.Schema.Types.Date
  },
  price: {
      type: mongoose.Schema.Types.Number
  }
});

module.exports = mongoose.model('shows', showsSchema);