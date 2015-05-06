var myRoutinesApp = angular.module('myRoutinesApp', [
  'ngRoute',
  'ngResource',
  'ngMessages',
  'controllers',
  'services'
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
      .otherwise({
        redirectTo: '/login'
      });
});