/*
Require Mongoose models
*/

const db = require('../models');


/*
Routes
*/

// GET: /api/reviews
function index(req, res) {
  db.Review.find({}, function(err, reviews){
    if (err) {console.log(err)}
    console.log(reviews);
    res.json(reviews);
  })
}

//POST: /api/movie/id/review
function create(req, res) {
  console.log(req.body);
  console.log(req.params.id);
  let newReview = req.body;
  let movieId = req.params.id;

  db.Review.create(newReview, function (err, reviewCreated) {
    if (err) {
      console.log(err);
    }
    db.Movie.findOneById(movieId, function(err, movieFound){
      if(err) {console.log(`movie update error: ${err}`)}

      console.log(`movie found: ${movieFound}`);
    })
    res.send('reviewCreated');
  })
}

module.exports = {
  index: index,
  create: create
}
