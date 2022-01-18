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
    try{
        const seatList = await seatSchema.find({ _id: seatId });
        if (!seatList.length) return seatList;
        const seatObj = JSON.parse(JSON.stringify(seatList[0]))
        seats.map(seatId => {
            const st = seatId.split('_');
            seatObj.seats.map(seatItem => {
                if (seatItem.row === st[0]){
                    console.log(seatItem.column)
                    seatItem.column[st[1]] = false
                }
            })
        })
        const updateSeats = await seatSchema.findOneAndUpdate({ _id: seatId }, { seats: seatObj.seats });
        return updateSeats;
    }
    catch (error) {
        console.log(error);
        return [];
    }
    
}

const bookTicket = async (userId, movieId, theatreId, seatId, seats) => {
    try{
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
        const updated = await bookSeat(seatId, seats);
        return {booked: booked, updated: updated};
    }
    catch (error) {
        console.log(error);
        return {};
    }
}

module.exports = {
    getMoviesList,
    getSeatList,
    bookTicket
};