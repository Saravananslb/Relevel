const { getMoviesList, getSeatList, bookTicket, getTickets } = require('../Service/movie.service');

const getMovies = async (req, res) => {
    const movies = await getMoviesList();
    res.status(200).json({
        moviesList: movies
    })
    return;
}

const getSeats = async (req, res) => {
    const showId = req.params.showId;
    const seats = await getSeatList(showId);
    res.status(200).json({
        seatList: seats
    })
    return;
}

const bookMovieTickets = async (req, res) => {
    const movieId = req.body.movieId;
    const theatreId = req.body.theatreId;
    const seatId = req.body.seatId;
    const seats = req.body.seats;
    const userId = res.locals.userId;
    const booked = await bookTicket(userId, movieId, theatreId, seatId, seats);
    res.status(200).json({
        booked
    });
    return;
}

const getMovieTickets = async (req, res) => {
    const userId = res.locals.userId;
    const booking = await getTickets(userId);
    res.status(200).json({
        booking
    });
    return;
}

module.exports = {
    getMovies,
    getSeats,
    bookMovieTickets,
    getMovieTickets
};