const { getShows } = require('../Service/theatre.service');

const getShowsByMovie = async(req, res) => {
    const movieId = req.params.movieId;
    const showList = await getShows(movieId);
    res.status(200).json({
        showList
    })
    return;
}

module.exports = {
    getShowsByMovie
}