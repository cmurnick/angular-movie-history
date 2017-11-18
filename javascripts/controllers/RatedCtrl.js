"use strict";

app.controller("RatedCtrl", function( $rootScope, $scope, MovieService){
	$scope.movies= [];

	const getMovies = () => {
		MovieService.getRatedMovies($rootScope.uid).then((results) => {
			$scope.movies = results;
		}).catch((err) => {
			console.log("error in getRatedMovies", err);
		});

	};

	getMovies();
	
	$scope.deleteMovie = (movieId) => {
		MovieService.deleteMovie(movieId).then((result) => {
			getMovies();
		}).catch((err) => {
			console.log("error in DelebeMovie", err);
		});
	};

	$scope.starChange = (event, movie) => {
		console.log("event", event);
		console.log("movie", movie);
		if(event.rating) {
			movie.rating = event.rating;
			let updatedMovie = MovieService.createMovieObject(movie);
			MovieService.updateMovie(updatedMovie, movie.id).then(() => {
				getMovies();
			}).catch ((err) =>  {
				console.log("error in updatedMovie", err);
			});
		}
	};
});