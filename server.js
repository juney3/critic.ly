/*
Modules and configuration
*/

// Required modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const db = require('./models');
// const controllers = require('./controllers');

// Express configuration
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));


/*
Server routes
*/

app.get('/', (req, res) => {
  res.send('Hello! This is the first hello world sanity check!')
});

//More routes to come!


/*
port*/

// Listen on port 3000
app.listen(process.env.PORT || 3000, () => console.log("critic.ly is doing awesome things on port 3000"));
