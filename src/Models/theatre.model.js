const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: {
    type: String
  },
  location: String
});
module.exports = mongoose.model('theatres', theatreSchema);