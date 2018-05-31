//sanity check
console.log('Sanity check');

$(document).ready(function() {
  console.log('testapp.js loaded');

  // render new review
  function renderReview(review) {
    let reviewTemplate =
    `<div class="reviewSection">
      <h5>User Review</h5>
      <div class="reviewContent row">
        <div class="reviewData col-8">
          <p>Review: ${review.reviewText}</p>
          <p>Date: ${review.createdAt.slice(0, 10)}</p>
        </div>
      <div class="reviewChanges col-4">
      <!-- User changes -->
        <button type="button" name="reviewUpdate" class="btn btn-primary reviewUpdate">Update review</button>
        <form action="/api/reviews/${review._id}/delete" method="DELETE">
              <button type="button" name="reviewDelete" class="btn btn-danger reviewDelete">Delete review</button>
            </form>
          </div>
        </div>
      </div>`;
      $('.review').prepend(reviewTemplate);
  }

  // find and show movies
  function showMovies(movies) {
    movies.forEach(function(movie){
      let movieId = movie._id
      let allReviews = movie.reviews;
      let reviewArr = [];
      let ratingArr =[];
      let avgRating = 0;

      // Get review data from movie record
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

      // Render each review
      let eachReview = reviewArr.map(function(singleReview) {
        let reviewTemplate =
        `<div class="reviewSection">
          <h5>User Review</h5>
          <div class="reviewContent row">
            <div class="reviewData col-8">
              <p>Review: ${singleReview.content}</p>
              <p>Date: ${singleReview.date.slice(0, 10)}</p>
            </div>
          <div class="reviewChanges col-4">
          <!-- User changes -->
            <button type="button" name="reviewUpdate" class="btn btn-primary reviewUpdate">Update review</button>
            <form action="/api/reviews/${singleReview.idd}/delete" method="DELETE" data-id="${singleReview.id} class="deleteReview">
                <button type="submit" class="btn btn-danger deleteThisReview">Delete review</button>
              </form>
              </div>
            </div>
          </div>`
        return (reviewTemplate);
      }).join('')



      // Calculate average user rating
      if (ratingArr.length != 0) {
        avgRating = ((ratingArr.reduce((total, singleRating) => total + singleRating)) / ratingArr.length).toFixed(2);
      }

      // Handle no rating and no review cases
      if (ratingArr === undefined || ratingArr.length === 0) {
        ratingArr = "No ratings currently";
      }

      if (reviewArr === undefined || reviewArr.length === 0) {
        eachReview = "No reviews currently";
      }

      // Render movie information
      let movieTemplate =
      `<div class="movieSection" data-id="${movieId}">
        <h4>Movie information</h4>
        <div class="movieContent row">
          <div class="movieData">
            <p>Title: ${movie.title}
            <p>Director: ${movie.director}</p>
            <p>Year: ${movie.year}</p>
            <p>Genre: ${movie.genre}</p>
          </div>
          <div class="userMovieInfo">
          <p>Average user rating: ${avgRating}</p>
          <div class="form-group">
            <form action="/api/movies/${movieId}/reviews" method="POST" class="reviewForm">
                <textArea name="reviewText" class=" form-control reviewText" placeholder="Enter your review here"></textArea>
                <input type="number" name="rating" class="form-control rating" placeholder="Select a rating from 1-5" min="1" max="5"/>
                <input type="hidden" name="movie" value="${movieId}"/>
                <input type="submit" name="reviewSubmit" class="btn btn-primary reviewSubmit" />
            </form>
          </div>
          </div>
        </div>
        <div class="criticlyReviews">
          <h5>Critic.ly Reviews</h5>
          <p class="review">${eachReview}</p>
        </div>
      </div>`;

      $('.movieResults').prepend(movieTemplate);
      }
    })
  }

  //Delete review
  $('.deleteReview').on('submit', 'document', function(event){
    event.preventDefault();

    let reviewId = $('.deleteReview').data('id');
    console.log(reviewId);
    let deleteURL = `/api/reviews/${reviewId}`
    console.log(deleteURL)
    // $.ajax({
    //   method: 'DELETE',
    //   url: deleteURL,
    //   success: console.log(reviewDeleted),
    //   error: handleError
    // });
  })


    // Ajax call to find all movies and call the showMovies function
    function findMovies() {
      $.ajax({
        method: 'GET',
        url: '/api/movies',
        success: showMovies,
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

  // Movie creation form submission
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

    // Review form submission
    // Add an event listener for all children of reviewForm
    $('.reviewForm').on('submit', '.movieResults', function(event){
      event.preventDefault();

      let movieId = $(movieSection).data('id');

      $.ajax({
        method: 'POST',
        url: `/api/movies/${movieId}/reviews`,
        data: $('.reviewForm').serialize(),
        success: renderReview,
        error: handleError
      });
    })



    findMovies();
})
