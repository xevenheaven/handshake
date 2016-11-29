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

	var profile = {
		name: 'profile',
		url: '/profile',
		templateUrl: './templates/profile.html',
		params: {
			me: {},
			user: {},
			handImg: './images/no-meetten.jpg'
		}
	};

	$stateProvider.state(splash);
	$stateProvider.state(signin);
	$stateProvider.state(signup);
	$stateProvider.state(welcome);
	$stateProvider.state(profile);
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

App.controller('SignUpController', function SignUpController($scope, $state) {
	$scope.name;
	$scope.email;
	$scope.password;
	$scope.profession;
	$scope.company;

	$scope.back = function () {
		$state.go('splash');
	};

	$scope.submit = function () {
		dpd.users.post({
			username: $scope.email,
			password: $scope.password,
			name: $scope.name,
			profession: $scope.profession,
			company: $scope.company
		}, function(session, error) {
			if (error) {
				alert('Please fill in the missing fields!');
			} else {
				$state.go('welcome');
			}
		});
	};
});

App.controller('WelcomeController', function WelcomeController($scope, $state, $q) {
	$scope.connected = true;

	if ($scope.connected) {
		$scope.meettenImgSrc = './images/meetten-autodesk.png';
	} else {
		$scope.meettenImgSrc = './images/no-meetten.png';
	}

	dpd.users.me(function (user) {
		$scope.me = user;
		$scope.name = user.name;
		$scope.meettens = user.meettens || [];
		$scope.userImg = user.photo || './images/default.jpg';

		$scope.meettensRight = [];
		$scope.meettensLeft = [];

		var meettenDetails = $scope.meettens.map(function(meetten, index) {
			return dpd.users.get(meetten.id).then(function (user) {
				var tempUser = user;
				tempUser.time = meetten.time;

				return tempUser;
			});
		});

		$q.all(meettenDetails).then(function (results) {
			results.sort(function (meettenA, meettenB) {
				if (meettenA.time < meettenB.time) {
					return 1;
				} else if (meettenA.time > meettenB.time) {
					return -1;
				} else {
					return 0;
				}
			});

			results.forEach(function (user, index) {
				if (index % 2 === 0) {
					$scope.meettensRight.push(user);
				} else {
					$scope.meettensLeft.push(user);
				}
			})
		});
	});

	$scope.triggerUser = function (user) {
		$state.go('profile', {
			me: $scope.me,
			user: user,
			handImg: $scope.meettenImgSrc
		});
	};
});

App.controller('ProfileController', function ProfileController($scope, $state, $stateParams) {
	window.scrollTo(0, 0);

	$scope.me = $stateParams.me;
	$scope.user = $stateParams.user;
	$scope.handImg = $stateParams.handImg;

	$scope.back = function () {
		$state.go('welcome');
	};

	$scope.connect = function () {

	};
});
