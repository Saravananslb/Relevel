const movieSchema = require('../Models/movies.model');
const seatSchema = require('../Models/seats.model');
const bookingSchema = require('../Models/booking.model');
const showsSchema = require('../Models/shows.model');
const theatreSchema = require('../Models/theatre.model');

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

const getTickets = async(userId) => {
    const bookings = await bookingSchema.find({userId: userId});
    const movies = await movieSchema.find();
    const theatres = await theatreSchema.find();
    const shows = await showsSchema.find();
    const bookingObj = JSON.parse(JSON.stringify(bookings))
    const showObj = JSON.parse(JSON.stringify(shows))
    bookingObj.map(bookItem => {
        movies.forEach(movieItem => {
            if (movieItem._id == bookItem.movieId ){
                bookItem.movieName = movieItem.name;
                bookItem.imageUrl = movieItem.image_url;
                return ;
            }
        })
        theatres.forEach(theatreItem => {
            if (theatreItem._id == bookItem.theatreId ){
                bookItem.theatreName = theatreItem.name;
                bookItem.location = theatreItem.location;
                return;
            }
        })
        showObj.forEach(showsItem => {
            showsItem.shows.map(itemsh => {
            const showIds = Object.keys(itemsh);
            if (showIds == bookItem.showId){
                bookItem.showTime = itemsh[showIds];
                return;
            }
        })
        })
    })
    return bookingObj;
}

module.exports = {
    getMoviesList,
    getSeatList,
    bookTicket,
    getTickets
};