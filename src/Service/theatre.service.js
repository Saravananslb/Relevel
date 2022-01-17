const theatreSchema = require('../Models/theatre.model');
const showsSchema = require('../Models/shows.model');

const getShows = async(movieId) => {
    const shows = await showsSchema.find({
        movieId: movieId
    })
    console.log(shows)
    const theatre = await theatreSchema.find().exec();
    const showList = [];
    shows.map((item, key) => {
        theatre.map(tItem => {
            if (item.theatreId == tItem._id){
                const showObj = JSON.parse(JSON.stringify(shows[key]))
                showList.push({
                    _id: item._id,
                    movieId: item.movieId,
                    theatreId: item.theatreId,
                    shows: showObj.shows,
                    price: item.price,
                    theatreName: tItem.name,
                    theatreLocation: tItem.location
                })
            }
    }) 
    });
    return showList;
}

module.exports = {
    getShows
}