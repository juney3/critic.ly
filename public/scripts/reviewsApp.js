//sanity check
console.log('Sanity check');

$(document).ready(function() {
  console.log('reviewsApp.js loaded');

  /*
  Global variables
  */

  let reviewArr = [];
  let ratingArr = [];
  let reviewsRatings = {};
  let avgRating = 0;
  let id;
  let movie;
  let reviewText;
  let rating;
  let title;
  let year;


/*
Render functions
*/
  // Render all movies from findMovies
  function renderAllMovies(movies) {
    movies.forEach(function(movie){
      id = movie._id;
      title = movie.title;
      year = movie.year;

      let allMoviesTemplate =
      `<button class="btn btn-info oneMovie" data-id="${id}">
        <p>${title}</p>
        <p>${year}</p>
      </button>`

      $('#allMovies').append(allMoviesTemplate)
    })
  }

  // Render movie found from search
  function renderMovie(movie, avgRating) {
    id = movie._id;
    title = movie.title;
    year = movie.year;
    let director = movie.director;
    let genre = movie.genre;

    let movieTemplate =
    `<div class="movieSection" data-id="${id}">
      <h4>Movie information</h4>
      <div class="movieContent row">
        <div class="movieData">
          <p>Title: ${title}
          <p>Director: ${director}</p>
          <p>Year: ${year}</p>
          <p>Genre: ${genre}</p>
        </div>
        <div class="userMovieInfo">
        <p>Average user rating: ${avgRating}</p>
        <div class="form-group">
          <form action="/api/movies/${id}/reviews" method="POST" class="reviewForm">
              <textArea name="reviewText" class=" form-control reviewText" placeholder="Enter your review here"></textArea>
              <input type="number" name="rating" class="form-control rating" placeholder="Select a rating from 1-5" min="1" max="5"/>
              <input type="hidden" name="movie" value="${id}"/>
              <input type="submit" name="reviewSubmit" class="btn btn-primary reviewSubmit" />
          </form>
        </div>
        </div>
      </div>`;

    $('.movieResult').empty();
    $('.movieResult').append(movieTemplate);
  }

  // render new review
  function renderReview(review) {
    id = review.id;
    reviewText = review.content;
    rating = review.rating;
    let date = review.date.slice(0,10);

    let reviewTemplate =
    `<div class="reviewSection">
      <h5>User Review</h5>
      <div class="reviewContent row">
        <div class="reviewData col-8">
          <p>Review: ${reviewText}</p>
          <p>User rating: ${rating}</p>
          <p>Date: ${date}</p>
        </div>
      <div class="reviewChanges col-4">

      <!-- User changes -->
        <button type="button" name="reviewUpdate" class="btn btn-primary reviewUpdate">Update review</button>

          <form action="/api/reviews/${id}" method="DELETE" class="deleteForm" data-id="${id}">
            <input type="submit" name="reviewDelete" class="btn btn-danger reviewDelete" value="Delete review"/>
          </form>
        </div>
      </div>
    </div>`;

      $('.movieReviews').prepend(reviewTemplate);
  }

  // Render all reviews
  function renderAllReviews(reviewsRatings) {
    reviewArr = reviewsRatings.reviews;
    reviewArr.forEach(function(review){
      renderReview(review);
    });
  }

// Collect all review data from the movie record
function getReviewData(movie) {
  reviewArr = [];
  ratingArr = [];
  id = movie._id;
  let allReviews = movie.reviews;

  // If there are records in the reviews key
  if (allReviews != undefined || allReviews.length != 0) {
    allReviews.forEach(function(thisReview){
      reviewArr.push({
        'id': thisReview._id,
        'content': thisReview.reviewText,
        'rating': thisReview.rating,
        'date': thisReview.createdAt,
        'movie': thisReview.movie
      });
      ratingArr.push(thisReview.rating);
    })
  }

    // Handle empty reviews conditions
    if (allReviews === undefined || allReviews.length === 0) {
        ratingArr = "No ratings currently";
        reviewArr = "No reviews currently";
    }

    //Add reviewArr and ratingArr to the reviewsRatings object
    reviewsRatings = {
      reviews: reviewArr,
      ratings: ratingArr
    }

    return reviewsRatings;

}

  // Calculate the average movie rating
  function calculateAverageRating(reviewsRatings) {
    ratingArr = reviewsRatings.ratings;

    avgRating = ((ratingArr.reduce((total, singleRating) => total + singleRating)) / ratingArr.length).toFixed(2);

    return avgRating;

}
  // Show a movie and its reviews
  function handleMovie(movie) {
    let id = movie._id;
    let allReviews = movie.reviews;

    getReviewData(movie);
    console.log(reviewsRatings);

    // if there are ratings, calculate the average
    if (reviewsRatings.ratings != "No ratings currently") {
      calculateAverageRating(reviewsRatings);
    }

    renderMovie(movie, avgRating);

    //display no reviews message
    if (reviewsRatings.reviews === "No reviews currently") {
      $('.movieReviews').html(`<p>${reviewsRatings.reviews}`);
    }

    // If there are reviews, render them in the page
    if (reviewsRatings.reviews != "No reviews currently") {
      renderAllReviews(reviewsRatings);
    }
    console.log('movie rendered');
  }

  //Delete review
  $('.movieReviews').on('submit', function(event){
    event.preventDefault();

    console.log(this);
    console.log(event.target)
    let id = $(event.target).data('id');
    console.log(id);
    let deleteURL = `/api/reviews/${id}`
    console.log(deleteURL)
    $.ajax({
      method: 'DELETE',
      url: `/api/reviews/${id}`,
      success: handleMovie,
      error: handleError
    });
  })


    // Ajax call to find all movies
    function findMovies() {
      $.ajax({
        method: 'GET',
        url: '/api/movies',
        success: renderAllMovies,
        error: handleError
      });
    }

  // error handler
      function handleError(err) {
        console.log(`The following error occurred: ${err}`);
      }

/*
Submit functions
*/

  // Movie find form submissions (name only)
  $('.movieSearch').on('submit', function(event){
    event.preventDefault();
    let movieTitle = $('#oneMovie').val();

    $.ajax({
      method: 'GET',
      url: `/api/movies/show/${movieTitle}`,
      success: handleMovie,
      error: handleError
    });
    this.reset();
  })

    // Review form submission
    // Add an event listener for all children of reviewForm
    $('.movieResult').on('submit',  function(event){
      event.preventDefault();

      let movieId = $('.movieSection').data('id');

      $.ajax({
        method: 'POST',
        url: `/api/movies/${movieId}`,
        data: $('.reviewForm').serialize(),
        success: handleMovie,
        error: handleError
      });
    })

    //Open a movie from one of the all movies buttons
    $('#allMovies').on('click', function(event){
      console.log(this);
      console.log(event.target);
      let movieId=$('.oneMovie').data('id');

      $.ajax({
        method: 'GET',
        url: `/api/movies/${movieId}`,
        success: handleMovie,
        error: handleError
      });
    })

    findMovies();
})
