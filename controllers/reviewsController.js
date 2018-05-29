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
    db.Movie.findOneAndUpdate(
      {_id: movieId},
      {$push:
        {reviews: reviewCreated
        }
      },
      function(err, movieUpdated){
      if(err) {console.log(`movie update error: ${err}`)}

      console.log(`movie updated: ${movieUpdated}`);
    })
    res.json(reviewCreated);
  })
}

module.exports = {
  index: index,
  create: create
}
