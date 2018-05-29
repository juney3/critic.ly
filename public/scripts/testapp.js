//sanity check
console.log('Sanity check');

$(document).ready(function() {
  console.log('testapp.js loaded');

// find and display users
  function showUsers(users) {
    users.forEach(function(user){
      console.log(user);
      let userTemplate =
      `<div>
        <h4>User information</h4>
        <p>Name: ${user.firstName} ${user.lastName}</p>
        <p>Email: ${user.email}</p>
        <p>Id#: ${user._id}</p>
        </div>`;

      $('.userResults').prepend(userTemplate);
    })
  }

  function handleUser(user) {
      let userTemplate =
      `<div>
        <h4>User name</h4>
        <p>Name: ${user.firstName} ${user.lastName}</p>
        <p>Email: ${user.email}</p>
        </div>`;

      $('.userResults').prepend(userTemplate);
    }

    function findUsers() {
      $.ajax({
        method: 'GET',
        url: '/api/users',
        success: showUsers,
        error: handleError
      });
    }

// find and show movies
function showMovies(movies) {
  movies.forEach(function(movie){
    /*
    Reviews
    */
    console.log(movie.reviews);
    let allReviews = movie.reviews;
    let review = [];
    let rating = [];
    let avgRating = 0;

    if (allReviews) {
      allReviews.forEach(function(thisReview){
        review.push(thisReview.reviewText);
        rating.push(thisReview.rating);
      })
    }
    console.log(`rating: ${rating}`);

    if (rating.length != 0) {
      avgRating = (rating.reduce((total, singleRating) => total + singleRating)) / rating.length
    }

    if (rating === undefined || rating.length === 0) {
      rating = "No ratings currently";
    }

    if (review === undefined || review.length === 0) {
      review = "No reviews currently";
    }

    let allRatings = allReviews.ratings
    let movieId = movie._id
    let movieTemplate =
    `<div>
      <h4>Movie information</h4>
      <p>Title: ${movie.title}
      <p>Director: ${movie.director}</p>
      <p>Year: ${movie.year}</p>
      <p>Genre: ${movie.genre}</p>
      <p>Id#: ${movieId}</p>
      <p>Reviews: ${review}</p>
      <p>Individual ratings: ${rating}</p>
      <p>Average rating: ${avgRating}</p>
      <form action="/api/movies/${movieId}/reviews" method="POST" class="reviewForm">
        <textArea name="reviewText" class="reviewText" placeholder="Enter your review here"></textArea>
        <input type="number" name="rating" class="rating" placeholder="Rating" min="1" max="5"/>
        <input type="hidden" name="movie" value="${movieId}"/>
        <input type="submit" name="reviewSubmit" class="reviewSubmit" />
      </form>
      </div>`;

    $('.movieResults').prepend(movieTemplate);
  })
}

function handleMovie(movie) {
    let movieTemplate =
    `<div>
      <h4>Movie name</h4>
      <p>Title: ${movie.title}</p>
      <p>Director: ${movie.director}</p>
      <p>Year: ${movie.year}</p>
      <p>Genre: ${movie.genre}</p>
      <p>Id#: ${movie._id}</p>
      <p>Reviews: ${movie.reviews}</p>
      </div>`;

    $('.movieResults').prepend(movieTemplate);
  }

  function findMovies() {
    $.ajax({
      method: 'GET',
      url: '/api/movies',
      success: showMovies,
      error: handleError
    });
  }


//find reviewsfunction showMovies() {

function showReviews(reviews){
  reviews.forEach(function(review){
    let reviewTemplate =
    `<p>Review: ${review.reviewText}</p>
     <p>Rating: ${review.rating}</p>
     <p>Movie ID: ${review.movie}</p>`;

    $('.reviewResults').prepend(reviewTemplate);
  })
}

function findReviews() {
  $.ajax({
    method: 'GET',
    url: '/api/reviews',
    success: showReviews,
    error: handleError
  });
}


// error handler
    function handleError(err) {
      console.log(`O noes! The following error occurred: ${err}`);
    }


// submit functions
  $('#registerForm').on('submit', function(event){
    event.preventDefault();
    console.log(this.firstName);
    $.ajax({
      method: 'POST',
      url: '/api/users',
      data: $(this).serialize(),
      success: function(user){
        console.log(user);
        handleCreate(user);
      },
      error: handleError
    });
    this.reset();
  })

  $('#movieForm').on('submit', function(event){
    event.preventDefault();
    console.log(this.title);
    $.ajax({
      method: 'POST',
      url: '/api/movies',
      data: $(this).serialize(),
      success: function(movie){
        console.log(movie);
        handleMovie(movie);
      },
      error: handleError
    });
    this.reset();
  })

  $('movieResults').on('submit', function(event){
    event.preventDefault();
    console.log(this);
    console.log('you submitted a review');
    $.ajax({
      method: 'POST',
      url: '/api/movies/:id/reviews',
      data: $(this).serialize(),
      success: console.log('review!'),
      error: handleError
    });
    this.reset();
  })

  findUsers();
  findMovies();
  findReviews();
})
