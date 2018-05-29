/*
Requirements
*/

// Require Mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Require other models

const Review = require('./review.js');


/*
Schema definition
*/

let MovieSchema = new Schema({
  title: String,
  director: String,
  year: Number,
  genre: [String],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
})

const Movie = mongoose.model('Movie', MovieSchema);


/*
Export the schema*/

module.exports = Movie;
