const express = require('express');
const  { getMovies, getSeats, bookMovieTickets, getMovieTickets }  = require('../Controller/movie.controller');
const  { getShowsByMovie }  = require('../Controller/theatre.controller');
const isAuthenticated = require('../Middleware/auth.middleware');

const router = express.Router();

router.get('/movies', getMovies);
router.get('/shows/:movieId', getShowsByMovie);
router.get('/seats/:showId', getSeats);
router.post('/book', isAuthenticated, bookMovieTickets);
router.get('/bookings', isAuthenticated, getMovieTickets);

module.exports = router;