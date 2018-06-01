/*
Modules and configuration
*/

// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models');
const controllers = require('./controllers');
const mo = require('method-override');

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

app.get('/register', function (req, res) {
    res.sendFile('views/register.html' , { root : __dirname});
})

app.get('/login', function (req, res) {
    res.sendFile('views/login.html' , { root : __dirname});
})


// api index route
app.get('/api', controllers.api.index);


// user routes
app.get('/api/users', controllers.users.index);

app.post('/api/users', controllers.users.create);


//movie routes
app.get('/api/movies', controllers.movies.index);

app.post('/api/movies', controllers.movies.create);

app.get('/api/movies/show/:title', controllers.movies.show);

app.get('/api/movies/:id', controllers.movies.retrieve)


//review routes
app.delete('/api/reviews/:id', controllers.reviews.destroy);

app.get('/api/reviews', controllers.reviews.index);

app.get('/api/reviews/recent', controllers.reviews.recent);

app.post('/api/movies/:id', controllers.reviews.create);

app.put('/api/reviews/:id', controllers.reviews.update);



/*
port*/

// Listen on port 3000
app.listen(process.env.PORT || 3000, () => console.log("critic.ly is doing awesome things on port 3000"));
