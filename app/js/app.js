var myRoutinesApp = angular.module('myRoutinesApp', [
  'ngRoute',
  'ngResource',
  'ngMessages',
  'controllers',
  'services'
]);

myRoutinesApp.config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'login.html',
        controller: 'LoginController'
      })
      .otherwise({
        redirectTo: '/'
      });
});