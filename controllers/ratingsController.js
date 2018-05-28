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

  db.Rating.create(newRating, function (err, ratingCreated) {
    if (err) {
      console.log(err);
      sendStatus(500);
    }
    console.log('new rating created');
    res.json(ratingCreated);
  })
}
