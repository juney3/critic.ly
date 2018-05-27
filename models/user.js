/*
Requirements
*/

// Require Mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Require other models

const Review = require('./review.js');
const Movie = require('./movie.js');
const Rating = require('./rating.js');


/*
Schema definition
*/

// Include timestamps option to track created at and updated at data

let UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  movies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: 'Rating'
  }]
},
  {
    timestamps: true
  }
);

const User = mongoose.model('User', UserSchema);


/*
Export the schema
*/

module.exports = User;
