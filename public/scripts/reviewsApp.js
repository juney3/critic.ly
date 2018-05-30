//sanity check
console.log('Sanity check');

$(document).ready(function() {
  console.log('testapp.js loaded');


  // find and show movies


  function showMovies(movies) {
    movies.forEach(function(movie){
      let movieId = movie._id
      let allReviews = movie.reviews;
      let reviewArr = [];
      let ratingArr =[];
      let avgRating = 0;

      if (allReviews != undefined || allReviews.length != 0) {
        allReviews.forEach(function(thisReview){
          reviewArr.push({
            'reviewId': thisReview._id,
            'content': thisReview.reviewText,
            'rating': thisReview.rating,
            'date': thisReview.createdAt,
            'movie': thisReview.movie
          });
          ratingArr.push(thisReview.rating);
        })
      // }

      let eachReview = reviewArr.map(function(singleReview) {
        let reviewTemplate =
        `<div class="reviewSection">
          <h5>User Review</h5>
          <div class="reviewContent row">
            <div class="reviewData col-8">
              <p>Review: ${singleReview.content}</p>
              <p>Date: ${singleReview.date}</p>
            </div>

            <div class="reviewChanges col-4">
              <div class="editForm">
                <button class="btn btn-primary" data-toggle="collapse" data-target=".collapseEditForm" data-parent="editForm" role="button" aria-expanded="false" aria-controls="collapseEditForm">
                  Click to edit review
                </button>
                <div class="collapseEditForm">
                  <form class="collapseEditForm" action="/api/reviews/${singleReview.reviewId}/edit" method="PUT">
                    <input type="text" name="textEdit" class="textEdit" placeholder="${singleReview.content}"/>
                    <input type="number" min="1" max="5" name="ratingEdit" class="ratingEdit" placeholder=${singleReview.rating}/>
                    <input type="submit" name="reviewEdit" class="reviewEdit" value="Edit"/>
                  </form>
                </div>
              </div>
              <form action="/api/reviews/${singleReview.reviewId}/delete">
                <input type="submit" name="reviewDelete" class="reviewDelete" value="Delete"/>
              </form>
            </div>
          </div>
        </div>`
        return (reviewTemplate);
      })

      // let displayReview = eachReview.forEach(oneReview => {
      //   console.log(`oneReview: ${oneReview}`);
      //   $('.review').append(oneReview);
      // })

      if (ratingArr.length != 0) {
        avgRating = ((ratingArr.reduce((total, singleRating) => total + singleRating)) / ratingArr.length).toFixed(2);
      }

      if (ratingArr === undefined || ratingArr.length === 0) {
        ratingArr = "No ratings currently";
      }

      if (reviewArr === undefined || reviewArr.length === 0) {
        eachReview = "No reviews currently";
      }

      let movieTemplate =
      `<div class="movieSection">
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
          <form action="/api/movies/${movieId}/reviews" method="POST" class="reviewForm">
            <div class="form-group">
              <textArea name="reviewText" class=" form-control reviewText" placeholder="Enter your review here"></textArea>
              <input type="number" name="rating" class="form-control rating" placeholder="Select a rating from 1-5" min="1" max="5"/>
              <input type="hidden" name="movie" value="${movieId}"/>
              <input type="submit" name="reviewSubmit" class="btn btn-primary reviewSubmit" />
            </div>
          </form>
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

    findMovies();
    findRecentReviews();
})
