const mongoose = require('mongoose');

const seatScheme = new mongoose.Schema({
    seats: {
        type: Object
    },
    showId: {
        type: String
    }
})

module.exports = mongoose.model('seats', seatScheme);