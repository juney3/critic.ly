/*
Require Mongoose models
*/

const db = require('../models');


/*
Routes
*/

//POST: /api/review
function create(req, res) {
  let rating = req.body.rating;
  let movieName = req.body.title;

  db.Review.create(newReview, function (err, reviewCreated) {
    if (err) {
      console.log(err);
      sendStatus(500);
    }
    console.log('new review created');
    res.json(reviewCreated);
  })
}
