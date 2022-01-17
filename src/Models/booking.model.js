const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  movieId: {
      type: String
  },
  theatreId: {
      type: String
  },
  showId: {
      type: String
  },
  seats: {
      type: Array
  },
  price: {
      type: Number
  },
  date: {
      type: Date
  }
});

module.exports = mongoose.model('bookings', bookingSchema);