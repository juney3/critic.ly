var db = require("./models");

var movieList = [{
  movieTitle: 'Deadpool 2',
  director: 'David Leitch',
  year: '2018',
  genres: [ 'action', 'adventure', 'comedy']
}, {
  movieTitle: 'Avengers: Infinity War',
  director: 'Anthony/Joe Russo',
  year: '2018',
  genres: [ 'action', 'adventure', 'fantasy']
}, {
  movieTitle: 'A Quiet Place',
  director: 'John Krasinski',
  year: '2018',
  genres: [ 'drama', 'horror', 'sci-fi']
}, {
  movieTitle: 'Coco',
  director: 'Lee Unkrich',
  year: '2017',
  genres: [ 'animation', 'adventure', 'comedy']
}, {
  movieTitle: 'The Incredibles',
  director: 'Brad Bird',
  year: '2004',
  genres: [ 'animation', 'adventure', 'action']
}, {
  movieTitle: 'Game Night',
  director: 'John Francis Daley',
  year: '2018',
  genres: [ 'comedy', 'crime', 'mystery']
}, {
  movieTitle: 'The Kissing Booth',
  director: 'Vince Marcello',
  year: '2018',
  genres: [ 'comedy', 'romance']
}, {
  movieTitle: "Harry Potter and the Sorcerer's Stone",
  director: 'Chris Columbus',
  year: '2001',
  genres: [ 'adventure', 'family', 'fantasy']
}, {
  movieTitle: 'Forrest Gump',
  director: 'Robert Zemeckis',
  year: '1994',
  genres: [ 'drama', 'romance']
}, {
  movieTitle: 'Thor: Ragnarok',
  director: 'Taika Waititi',
  year: '2017',
  genres: [ 'action', 'adventure', 'comedy']
}, {
  movieTitle: 'I Kill Giants',
  director: 'Anders Walter',
  year: '2017',
  genres: [ 'drama', 'fantasy', 'thriller']
}, {
  movieTitle: 'Blade Runner 2049',
  director: 'Denis Villeneuve',
  year: '2017',
  genres: [ 'drama', 'mystery', 'sci-fi']
}];

// seed data
// have recent reviews show up
// show last recent reviews

var reviewList = [{
  reviewId: '6024u189518828'
  movie: 'I Kill Giants',
  review: 'There are giants that get killed in this movie',
  date: 2018-05-29,
  rating: 5
}, {
  reviewId: '2024u189518828'
  movie: 'Blade Runner 2049',
  review: 'Exciting, on the edge of my seat the entire time',
  date: 2018-05-30,
  rating: 5
}, {
  reviewId: '6024u189518828'
  movie: 'I Kill Giants',
  review: 'There are giants that get killed in this movie',
  date: 2018-05-29,
  rating: 5
}, {
  reviewId: '6024u189518828'
  movie: 'I Kill Giants',
  review: 'There are giants that get killed in this movie',
  date: 2018-05-29,
  rating: 5
}];


movieList.forEach(function(movie) {
  movie.reviews = reviewList;
});


db.Album.remove({}, function(err, albums){
  // code in here runs after all albums are removed
  db.Album.create(albumsList, function(err, albums){
    // code in here runs after all albums are created
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });
});
