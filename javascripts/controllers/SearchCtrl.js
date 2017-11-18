"use strict";

app.controller("SearchCtrl", function($location, $rootScope, $scope, MovieService, tmdbService){
	$scope.movies = [];





	$scope.saveRated = (tmdbMovie) => {
		tmdbMovie.uid = $rootScope.uid;
		tmdbMovie.isWatched = true;
		tmdbService.rating = 0;
		let newMovie = MovieService.createMovieObject(tmdbMovie);
		MovieService.postNewMovie(newMovie).then (() => {
			$location.path('/rated');
		}).catch((err) => {
			console.log("error in postNewMovie", err);
		});
	};

	$scope.saveWishlist = (tmdbMovie) => {
		tmdbMovie.uid = $rootScope.uid;
		tmdbMovie.isWatched = false;
		tmdbService.rating= 0;
		let newMovie = MovieService.createMovieObject(tmdbMovie);
		newMovie.isWatched = false;
		MovieService.postNewMovie(newMovie).then (() => {
			$location.path('/wishlist');
		}).catch((err) => {
			console.log("error in postNewMovie", err);
		});
		};


	$scope.enterPush = (event) => {
		if(event.keyCode === 13) {
			tmdbService.searchMovies(event.target.value).then((results) =>{
				$scope.movies = results.data.results;
			console.log("movies?", results.data.results);
		}).catch((err) => {
			console.log("error in searchMovies", err);
		});
		}
	};
});


	
