/*
Require Mongoose models
*/

const db = require('../models');


/*
Routes
*/

// GET: /api/reviews
// get all reviews
function index(req, res) {
  db.Review.find({}, function(err, reviews){
    if (err) {console.log(err)}
    res.json(reviews);
  })
}

function recent(req, res) {
  db.Review.find({})
  .sort({
      'createdAt' : -1
    })
  .limit(5)
  .populate('movie')
  .exec(function(err, reviews){
    if (err) {console.log(err)};
    res.json(reviews);
  })
}

//POST: /api/movie/id/review
function create(req, res) {
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
      let id = movieUpdated._id;
      db.Movie.findOne({'_id': id})
      .populate('reviews')
      .exec(function(err, movieFound) {
        if(err) {console.log(`movie find error: ${err}`)}
        res.json(movieFound);
      })
    })
  })
}

function update(req, res) {
  let updatedReview = req.body;
  let reviewId = req.params.id;

  db.Review.findOneAndUpdate(
    {_id: reviewId},
    {$set: {
      reviewText: updatedReview.reviewText,
      rating: updatedReview.rating
      }
    },
    function(err, updatedReview){
      if (err) {console.log(`error: ${err}`)}
      res.json(updatedReview)
    })
  }

function destroy(req, res) {
  let reviewID = req.params.id;
  console.log(req.params.id)

  db.Review.findByIdAndRemove(reviewId, function(err, reviewDeleted){
    if (err) {console.log(`error: ${err}`)}
    res.json(reviewDeleted);
  })
}

module.exports = {
  destroy: destroy,
  index: index,
  create: create,
  recent: recent,
  update: update,
}
