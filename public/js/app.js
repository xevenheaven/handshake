var App = angular.module('App', ['ui.router', 'ngMaterial']);

App.config(function($stateProvider) {
	var signin = {
		name: 'signin',
		url: '/signin',
		templateUrl: './templates/signin.html'
	};

	var signup = {
		name: 'signup',
		url: '/signup',
		templateUrl: './templates/signup.html'
	};

	$stateProvider.state(signin);
	$stateProvider.state(signup);
});

App.controller('SplashScreenController', function SplashScreenController($scope, $state) {
	$scope.signin = function () {
		$state.go('signin');
	};

	$scope.signup = function () {
		$state.go('signup');
	};
});
