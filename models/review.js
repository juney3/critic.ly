/*
Requirements
*/

// Require Mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Require other models

const User = require('./user.js');
const Movie = require('./movie.js');


/*
Schema definition
*/

// Include timestamps option to track created at and updated at data

let ReviewSchema = new Schema({
  text: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }
},
  {
    timestamps: true
  }
)

const Review = mongoose.model('Review', ReviewSchema);


/*
Export the schema
*/

module.exports = Review;
