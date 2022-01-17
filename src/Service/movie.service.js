const movieSchema = require('../Models/movies.model');
const seatSchema = require('../Models/seats.model');
const bookingSchema = require('../Models/booking.model');
const showsSchema = require('../Models/shows.model');

const getMoviesList = async () => {
    const movies = await movieSchema.find();
    return movies;
}

const getSeatList = async (showId) => {
    const seats = await seatSchema.find({
        _id: showId
    })
    return seats;
}

const bookSeat = async (seatId, seats) => {
    // seats.map(seat => {
    //     seatSchema.updateOne({ _id: seatId, "seats[seat]": false}, {'$set':  {'items.$': {  : false}}})
    // })
   
}

const bookTicket = async (userId, movieId, theatreId, seatId, seats) => {
    const showDetails = await showsSchema.find({ theatreId: theatreId });
    const price = showDetails[0].price * seats.length;
    const booking = new bookingSchema({
        userId: userId,
        movieId: movieId,
        theatreId: theatreId,
        showId: seatId,
        seats: seats,
        price: price,
        date: new Date()
    });
    const booked = await booking.save();
    await bookSeat(seatId, seats);
    return booked;
}

module.exports = {
    getMoviesList,
    getSeatList,
    bookTicket
};