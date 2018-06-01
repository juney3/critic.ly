function showRecentReviews(reviews){
  console.log(reviews);
  reviews.forEach(function(review){
    let reviewTemplate =
    `<div class="newReview"><p class="recentReviewsMovieName"> ${review.movie.title}</p>
    <p class="recentReviewsReview">Review: ${review.reviewText}</p>
    <p class="starRating">${Array.apply(null, new Array(review.rating)).map(function (x) { return `<img src="../images/full-star.png"/>` }).join('')}</p>
    <p class="recentReviewsRating"> Reviewer's Star Rating: ${review.rating}</p>
    <p class="recentReviewsDate">Date: ${review.createdAt.slice(0,10)}</p>
    </div>`;

    $('.recentReviews').append(reviewTemplate);
    })
  }


function handleError(err) {
	console.log(`O noes! The following error occurred: ${err}`);
}

function findRecentReviews() {
  $.ajax({
    method: 'GET',
    url: '/api/reviews/recent',
    success: showRecentReviews,
    error: handleError
  })
}
//
function addNewlySubmittedMovies(movieList) {
  movieList.forEach(function(movie) {
    let newlyAddedMovies = `
  <div class="newMovie4Review">
  <p class="newMoviesTitle"> ${movie.title} </p>
  <p class="newMoviesDirector"> Director: ${movie.director} </p>
  <p class="newMoviesYear"> Year Released: ${movie.year} </p>
  <p class="newMoviesGenre"> Genres: ${movie.genre} </p>
  </div>
  `;

  $('#newlyAddedMovies').append(newlyAddedMovies);
  })
}

function findRecentMovies() {
  $.ajax({
    method: 'GET',
    url: '/api/movies/recent',
    success: addNewlySubmittedMovies,
    error: handleError
  })
}

findRecentMovies();

findRecentReviews(); //
// /**
//  * Star rating class
//  * @constructor
//  */
// function StarRating() {
//   this.init();
// };
//
// /**
//  * Initialize
//  */
// StarRating.prototype.init = function() {
//   this.stars = document.querySelectorAll('#rating span');
//   for (var i = 0; i < this.stars.length; i++) {
//     this.stars[i].setAttribute('data-count', i);
//     this.stars[i].addEventListener('mouseenter', this.enterStarListener.bind(this));
//   }
//   document.querySelector('#rating').addEventListener('mouseleave', this.leaveStarListener.bind(this));
// };
//
// /**
//  * This method is fired when a user hovers over a single star
//  * @param e
//  */
// StarRating.prototype.enterStarListener = function(e) {
//   this.fillStarsUpToElement(e.target);
// };
//
// /**
//  * This method is fired when the user leaves the #rating element, effectively removing all hover states.
//  */
// StarRating.prototype.leaveStarListener = function() {
//   this.fillStarsUpToElement(null);
// };
//
// /**
//  * Fill the star ratings up to a specific position.
//  * @param el
//  */
// StarRating.prototype.fillStarsUpToElement = function(el) {
//   // Remove all hover states:
//   for (var i = 0; i < this.stars.length; i++) {
//     if (el == null || this.stars[i].getAttribute('data-count') > el.getAttribute('data-count')) {
//       this.stars[i].classList.remove('hover');
//     } else {
//       this.stars[i].classList.add('hover');
//     }
//   }
// };
//
// // Run:
// new StarRating();

var sMax;	// the maximum number of stars
var holder; // the holding pattern for clicked state
var preSet; // the PreSet value onces a selection has been made
var rated;

// Rollover for image Stars //
function rating(num){
	sMax = 0;	// Isthe maximum number of stars
	for(n=0; n<num.parentNode.childNodes.length; n++){
		if(num.parentNode.childNodes[n].nodeName == "A"){
			sMax++;
		}
	}

	if(!rated){
		s = num.id.replace("_", ''); // Get the selected star
		a = 0;
		for(i=1; i<=sMax; i++){
			if(i<=s){
				document.getElementById("_"+i).className = "on";
				document.getElementById("rateStatus").innerHTML = num.title;
				holder = a+1;
				a++;
			}else{
				document.getElementById("_"+i).className = "";
			}
		}
	}
}

// For when you roll out of the the whole thing //
function off(me){
		if(!rated){
		if(!preSet){
			for(i=1; i<=sMax; i++){
				document.getElementById("_"+i).className = "";
				document.getElementById("rateStatus").innerHTML = me.parentNode.title;
			}
		}else{
			rating(preSet);
			document.getElementById("rateStatus").innerHTML = document.getElementById("ratingSaved").innerHTML;
		}
	}
}

// When you actually rate something //
function rateIt(me){
	if(!rated){
		document.getElementById("rateStatus").innerHTML = document.getElementById("ratingSaved").innerHTML + ""+me.title;
		preSet = me;
		rated=1;
		sendRate(me);
		rating(me);
	}
}

// Send the rating information somewhere using Ajax or something like that.
function sendRate(sel){
	alert("Your rating was: "+sel.title);
}
