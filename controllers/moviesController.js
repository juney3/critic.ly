/*
Require Mongoose models
*/

const db = require('../models');


/*
API routes
*/

// GET index: /api/movie
// Send back all movies
function index (req, res) {
  db.Movie.find({}, (err, movies) => {
    if (err) {
      console.log(`error: ${err}`);
      sendStatus(500);
    }
    console.log('getting movie list');
    res.json(movies);
  });
};

// POST: /api/movie
// Create a movie
function create (req, res) {
  let newMovie = req.body;
  let genreArray = newMovies.genre.split(',');
  newMovie.genres = genreArray;

  db.Movie.create(newMovie, function (err, movieCreated) {
    if (err) {
      console.log(`error: ${err}`);
      sendStatus(500);
    }
    console.log(`new movie created: ${movieCreated.title}`);
    res.json(movieCreated);
  })
};

// GET one movie: /api/movie/movieId
// Send back one movie as JSON
function show (req, res) {
  let movieId = req.params.id;

  db.findOneById(movieId, function (err, movieFound) {
    if (err) {
      console.log(`error: ${err}`);
      sendStatus(500);
    }
    console.log(`movie found: ${movieFound.title}`);
    res.json(movieFound);
  })
};


/*
Export the functions
*/

module.exports = {
  index: index,
  create: create;
  show: show;
}
