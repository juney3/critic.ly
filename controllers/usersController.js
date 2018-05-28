/*
Require Mongoose models
*/

const db = require('../models');


/*
Global functions
*/

function errorHandler(err) {
  console.log(`error: ${err}`);
  sendStatus(500);
}


/*
Routes
*/

// POST /user
// Create a new user
function createNewUser(req, res) {
  let userEmail = req.body.email;

  db.findOne({'email': userEmail}, function(err, foundUser) {
    if (err) {
      errorHandler(err);
    }
    if (foundUser) {
      res.send(`It looks like you already have an account. <a href="#">Sign in here.</a>`)
    }

    if (!foundUser) {
      let newUser = req.body;
      db.User.create(newUser, function (err, userCreated) {
        if (err) {
          console.error(err);
        }
        console.log(`new user ${userCreated.firstName} ${userCreated.lastName} created`);
        res.json(userCreated);
      })
    }
  })
}
