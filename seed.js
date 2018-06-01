var db = require("./models");

var movieList = [{
  title: 'Deadpool 2',
  director: 'David Leitch',
  year: '2018',
  genre: [ 'action', 'adventure', 'comedy']
}, {
  title: 'Avengers: Infinity War',
  director: 'Anthony/Joe Russo',
  year: '2018',
  genre: [ 'action', 'adventure', 'fantasy']
}, {
  title: 'A Quiet Place',
  director: 'John Krasinski',
  year: '2018',
  genre: [ 'drama', 'horror', 'sci-fi']
}, {
  title: 'Coco',
  director: 'Lee Unkrich',
  year: '2017',
  genre: [ 'animation', 'adventure', 'comedy']
}, {
  title: 'The Incredibles',
  director: 'Brad Bird',
  year: '2004',
  genre: [ 'animation', 'adventure', 'action']
}, {
  title: 'Game Night',
  director: 'John Francis Daley',
  year: '2018',
  genre: [ 'comedy', 'crime', 'mystery']
}, {
  title: 'The Kissing Booth',
  director: 'Vince Marcello',
  year: '2018',
  genre: [ 'comedy', 'romance']
}, {
  title: "Harry Potter and the Sorcerer's Stone",
  director: 'Chris Columbus',
  year: '2001',
  genre: [ 'adventure', 'family', 'fantasy']
}, {
  title: 'Forrest Gump',
  director: 'Robert Zemeckis',
  year: '1994',
  genre: [ 'drama', 'romance']
}, {
  title: 'Thor: Ragnarok',
  director: 'Taika Waititi',
  year: '2017',
  genre: [ 'action', 'adventure', 'comedy']
}, {
  title: 'I Kill Giants',
  director: 'Anders Walter',
  year: '2017',
  genre: [ 'drama', 'fantasy', 'thriller']
}, {
  title: 'Blade Runner 2049',
  director: 'Denis Villeneuve',
  year: '2017',
  genre: [ 'drama', 'mystery', 'sci-fi']
}];

// seed data
// have recent reviews show up
// show last recent reviews

// var reviewList = [{
//   movie: 'I Kill Giants',
//   reviews: {
//     reviewText:
//     rating:
//     user: {
//       type
//     },
//
//   },
//   date: 2018-05-29,
//   rating: 5,
//   movie_id: '33497223482jf';
// }, {
//   reviewId: '2024u189518828'
//   movie: 'Blade Runner 2049',
//   review: 'Exciting, on the edge of my seat the entire time',
//   date: 2018-05-30,
//   rating: 5,
//   movie_id: '33497223482js'
// }, {
//   reviewId: '6024u189518828'
//   movie: 'I Kill Giants',
//   review: 'There are giants that get killed in this movie',
//   date: 2018-05-29,
//   rating: 5,
//   movie_id: '334972234ssjf'
// }, {
//   reviewId: '6024u189518828'
//   movie: 'I Kill Giants',
//   review: 'There are giants that get killed in this movie',
//   date: 2018-05-29,
//   rating: 5,
//   movie_id: '33497223786sjf'
// }];


// movieList.forEach(function(movie) {
//   movie.reviews = reviewList;
// });


db.Movie.remove({}, function(err, movies){
  // code in here runs after all albums are removed
  db.Movie.create(movieList, function(err, movies){
    // code in here runs after all albums are created
    if (err) { return console.log('ERROR', err); }
    console.log("all movies:", movies);
    console.log("created", movies.length, "movies");
    process.exit();
  });
});
