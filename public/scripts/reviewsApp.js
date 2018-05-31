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

      // Get review data from movie record
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
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal">
              Click to edit review
            </button>

            <!-- Modal -->
              <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Edit review</h5>
                      <button type="button" class="close"     data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form class="editReviewForm" action="/api/reviews/${singleReview.reviewId}/edit" method="PUT}">
                        <div class="form-group">
                          <textArea name="reviewText" class=" form-control reviewText" placeholder="${singleReview.content}"></textArea>
                          <input type="number" name="rating" class="form-control rating" placeholder="
                          ${singleReview.rating}" min="1" max="5"/>
                          <input type="hidden" name="movie" value="${singleReview.movie}"/>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary reviewUpdateSave">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
              <form action="/api/reviews/${singleReview.reviewId}/delete" method="DELETE">
                <button type="button" name="reviewDelete" class="btn btn-danger reviewDelete">Delete review</button>
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

    // Ajax call to find all movies
    function findMovies() {
      $.ajax({
        method: 'GET',
        url: '/api/movies',
        success: showMovies,
        error: handleError
      });
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
    // Add an event listener for all children
    $('.reviewForm').on('submit', '.movieResults', function(event){
      event.preventDefault();

      let movieId = $(movieSection).data('id');

      $.ajax({
        method: 'POST',
        url: `/api/movies/${movieId}/reviews`,
        data: $('.reviewForm').serialize(),
        success: review => {
          console.log(`review created: ${review}`);
        },
        error: handleError
      });
    })

    // Update form event

    findMovies();
})
