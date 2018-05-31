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
  console.log(req.params.id);
  console.log(req.body);

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
      res.json(movieUpdated);
    })
  })
}

module.exports = {
  index: index,
  create: create,
  recent: recent
}
