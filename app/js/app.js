var myRoutinesApp = angular.module('myRoutinesApp', [
  'ngRoute',
  'ngResource',
  'ngMessages',
  'ngCookies',
  'controllers',
  'services',
  'ui.bootstrap'
]);

myRoutinesApp.config(function($routeProvider){
    $routeProvider
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController'
      })
      .when('/register', {
          templateUrl: 'register.html',
          controller: 'RegisterController'
        })
      .when('/', {
          templateUrl: 'home.html',
          controller: 'HomeController'
        })
      .otherwise({
        redirectTo: '/login'
      });
});

myRoutinesApp.run(['$rootScope', '$location', '$cookieStore', '$http',
  function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // redirect to login page if not logged in
      if ($location.path() !== '/login' && $location.path() !== '/register' && !$rootScope.globals.currentUser ) {
        $location.path('/login');
      }
    });
  }]);