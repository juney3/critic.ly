/*
Requirements
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/*
Connect to DB
*/

mongoose.connect('mongodb://localhost/critic.ly');


/*
Export models so they can be used by other modules
*/
module.exports.Comment = require('./comment.js');
module.exports.Movie = require('./movie.js');
module.exports.Rating =
require('./rating.js');
module.exports.User = require('/.user.js');
