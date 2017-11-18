"use strict";

app.controller("WishlistCtrl", function($location, $rootScope, $scope, MovieService){
	$scope.controller = "WishlistCtrl";

	const getMovies = () => {
		MovieService.getWishlistMovies($rootScope.uid).then((results) => {
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

	$scope.switchWatched = (movie, movieId) => {
		movie.isWatched = true;
		let updatedMovie = MovieService.createMovieObject(movie);
		MovieService.updateMovie(updatedMovie, movie.id).then((result) => {
			getMovies();
		}).catch((err) => {
			console.log("error in update movie", err);
		});
	};

	$scope.movieDetail = (movieId) => {
		$location.path(`/movie/${movieId}`);
	};
});