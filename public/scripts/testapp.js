//sanity check
console.log('Sanity check');

$(document).ready(function() {
  console.log('testapp.js loaded');

// find and display users
  function showUsers(users) {
    users.forEach(function(user){
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
    let allReviews = movie.reviews;
    let reviewTextArr = [];
    let ratingArr =[];
    let avgRating = 0;

    if (allReviews != undefined || allReviews.length != 0) {
      allReviews.forEach(function(thisReview){
        reviewTextArr.push({
          'reviewId': thisReview._id,
          'content': thisReview.reviewText,
          'date': thisReview.createdAt
        });
        ratingArr.push(thisReview.rating);
      })
    }

    console.log('this is review: ' + reviewTextArr)
    let eachReview = reviewTextArr.map(function(singleReview) {
      console.log(singleReview);
      return(
        `<div>
        <h5>User Review</h5>
        <p>Review: ${singleReview.content}<p>
        <p>Date: ${singleReview.date}</p>
        
        <input type="submit" name="reviewEdit" value="Edit">
        <input type="submit" name="reviewDelete" value="Delete">
        <br>
        </div>`
    );
    })

    if (ratingArr.length != 0) {
      avgRating = ((ratingArr.reduce((total, singleRating) => total + singleRating)) / ratingArr.length).toFixed(2);
    }

    if (ratingArr === undefined || ratingArr.length === 0) {
      ratingArr = "No ratings currently";
    }

    if (reviewTextArr === undefined || reviewTextArr.length === 0) {
      reviewTextArr = "No reviews currently";
    }

    let movieId = movie._id
    let movieTemplate =
    `<div>
      <h4>Movie information</h4>
      <p>Title: ${movie.title}
      <p>Director: ${movie.director}</p>
      <p>Year: ${movie.year}</p>
      <p>Genre: ${movie.genre}</p>
      <p>Id#: ${movieId}</p>
      <p>Reviews: ${eachReview}</p>
      <p>Individual ratings: ${ratingArr}</p>
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
      <form action="/api/movies/${movie._id}/reviews" method="POST" class="reviewForm">
        <textArea name="reviewText" class="reviewText" placeholder="Enter your review here"></textArea>
        <input type="number" name="rating" class="rating" placeholder="Rating" min="1" max="5"/>
        <input type="hidden" name="movie" value="${movie._id}"/>
        <input type="submit" name="reviewSubmit" class="reviewSubmit" />
      </form>
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

function showRecentReviews(reviews){
  console.log(reviews);
  reviews.forEach(function(review){
    let reviewTemplate =
    `<h5>Recent User Reviews</h5>
    <p>Movie: ${review.movie.title}</p>
    <p>Review: ${review.reviewText}</p>
    <p>Rating: ${review.rating}</p>
    <p>Date: ${review.createdAt}</p>
    <br>`;

    $('.reviewResults').append(reviewTemplate);
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

function findRecentReviews() {
  $.ajax({
    method: 'GET',
    url: '/api/reviews/recent',
    success: showRecentReviews,
    error: handleError
  })
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
  findRecentReviews();
})
