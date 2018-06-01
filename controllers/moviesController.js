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
  db.Movie.find({})
    .populate('reviews')
    .exec(function(err, results) {
      if (err) {console.log(`error: ${err}`)}

      res.json(results);
    })
};

// POST: /api/movie
// Create a movie
function create (req, res) {
  let newMovie = req.body;
  let genreArray = newMovie.genre.split(',');
  newMovie.genres = genreArray;
  console.log('you want to create a movie');

  db.Movie.create(newMovie, function (err, movieCreated) {
    if (err) {
      console.log(`error: ${err}`);
    }
    console.log(`new movie created: ${movieCreated.title}`);
    res.redirect('/myReviews');
  })
}

// GET one movie: /api/movie/movieId
// Send back one movie as JSON
function show (req, res) {
  let movieId = req.params.id;

  db.findOneById(movieId, function (err, movieFound) {
    if (err) {
      console.log(`error: ${err}`);
    }
    console.log(`movie found: ${movieFound.title}`);
    res.json(movieFound);
  })
};

function recent (req, res) {
  db.Movie.find({})
  .sort({
      'createdAt' : -1
    })
  .limit(5)
  .populate('review')
  .exec(function(err, movies){
    if (err) {console.log(err)};
    console.log(movies);
    res.json(movies);
  })
}


/*
Export the functions
*/

module.exports = {
  index: index,
  create: create,
  show: show,
  recent: recent
}
