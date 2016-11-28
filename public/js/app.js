var App = angular.module('App', ['ui.router', 'ngMaterial']);

App.config(function($stateProvider) {
	var splash = {
		name: 'splash',
		url: '/',
		templateUrl: './index.html'
	};

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

	var welcome = {
		name: 'welcome',
		url: '/welcome',
		templateUrl: './templates/welcome.html'
	};

	$stateProvider.state(splash);
	$stateProvider.state(signin);
	$stateProvider.state(signup);
	$stateProvider.state(welcome);
});

App.controller('SplashScreenController', function SplashScreenController($scope, $state) {
	$scope.signin = function () {
		$state.go('signin');
	};

	$scope.signup = function () {
		$state.go('signup');
	};
});

App.controller('SignInController', function SignInController($scope, $state) {
	$scope.email;
	$scope.password;

	$scope.back = function () {
		$state.go('splash');
	};

	$scope.submit = function () {
		dpd.users.login({
			username: $scope.email,
			password: $scope.password
		}, function(session, error) {
			if (error) {
				alert('Login failed!');
			} else {
				$state.go('welcome');
			}
		});
	};
});
