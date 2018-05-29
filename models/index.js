/*
Requirements
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/*
Connect to DB
*/

mongoose.connect('mongodb://localhost/criticly');


/*
Export models so they can be used by other modules
*/
module.exports.Review = require('./review.js');
module.exports.Movie = require('./movie.js');
module.exports.User = require('./user.js');
