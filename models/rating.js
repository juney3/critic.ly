/*
Requirements
*/

// Require mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Require other models

const User = require('./user.js');
const Movie = require('./movie.js');


/*
Schema definition
*/

// Include timestamps option to track created at and updated at data

let RatingSchema = new Schema({
  ratingNumber: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }
},
  {timestamps}
);

const Rating = mongoose.model('Rating', RatingSchema);


/*
Export the schema
*/

module.exports = Rating;
