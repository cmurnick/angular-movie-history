"use strict";

app.controller("MovieDetailCtrl", function($routeParams, $scope, MovieService) {
	$scope.movie = {};

	console.log("Movieid", $routeParams.id);

	const getMovie = () => {
		MovieService.getSingleMovie($routeParams.id).then((results) =>{
			$scope.movie=results.data;
		}).catch((err) => {
			console.log("Err in Getsinglemovie", err);
			});
		};
	
			

	getMovie();


	$scope.switchWatched = (movie, movieId) => {
		movie.isWatched = true;
		let updatedMovie = MovieService.createMovieObject(movie);
		MovieService.updateMovie(updatedMovie, $routeParams.id).then((result) => {
			getMovie();
		}).catch((err) => {
			console.log("error in update movie", err);
		});
	};



	$scope.starChange = (event, movie) => {
		console.log("event", event);
		console.log("movie", movie);
		if(event.rating) {
			movie.rating = event.rating;
			let updatedMovie = MovieService.createMovieObject(movie);
			MovieService.updateMovie(updatedMovie, $routeParams.id).then(() => {
				getMovie();
			}).catch ((err) =>  {
				console.log("error in updatedMovie", err);
			});
		}
	};
});