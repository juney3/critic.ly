/*
Require Mongoose models
*/

const db = require('../models');


/*
Global functions
*/

function errorHandler(err) {
  console.log(`error: ${err}`);
}


/*
Routes
*/
// GET /users
function index(req, res) {
  db.User.find({}, function(err, users) {
    if(err){return console.log(err)}
    res.json(users);
  })
}

// POST /users
// Create a new user
function create(req, res) {
  let userEmail = req.body.email;
  let newUser = req.body;
  console.log(req.body);

  db.User.create(newUser, function (err, userCreated) {
    if (err) {
      errorHandler(err);
    }
    console.log(`new user ${userCreated.firstName} ${userCreated.lastName} created`);
    res.json(userCreated);
  })

  // db.findOne({'email': userEmail}, function(err, foundUser) {
  //   if (err) {
  //     errorHandler(err);
  //   }
  //   if (foundUser) {
  //     res.send(`It looks like you already have an account. <a href="#">Sign in here.</a>`)
  //   }
  //
  //   if (!foundUser) {
  //     let newUser = req.body;
  //     db.User.create(newUser, function (err, userCreated) {
  //       if (err) {
  //         console.error(err);
  //       }
  //       console.log(`new user ${userCreated.firstName} ${userCreated.lastName} created`);
  //       res.json(userCreated);
  //     })
  //   }
  // })
}

module.exports = {
  index: index,
  create: create
}
