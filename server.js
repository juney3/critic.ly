/*
Modules and configuration
*/

// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models');
const controllers = require('./controllers');

// Express configuration
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));


/*
Server routes
*/

//pages
app.get('/', function (req, res) {
    res.sendFile('views/index.html' , { root : __dirname});
})

app.get('/reviews', function (req, res) {
    res.sendFile('views/testUserForm.html' , { root : __dirname});
})

app.get('/myReviews', function (req, res) {
    res.sendFile('views/myReviews.html' , { root : __dirname});
})

// index route
app.get('/api', controllers.api.index);


// user routes
app.get('/api/users', controllers.users.index);

app.post('/api/users', controllers.users.create);


//movie routes
app.get('/api/movies', controllers.movies.index);

app.post('/api/movies', controllers.movies.create);


//review routes
app.get('/api/reviews', controllers.reviews.index);

app.get('/api/reviews/recent', controllers.reviews.recent);

app.post('/api/movies/:id/reviews', controllers.reviews.create);

/*
port*/

// Listen on port 3000
app.listen(process.env.PORT || 3000, () => console.log("critic.ly is doing awesome things on port 3000"));
