
var services = angular.module('services',["ngResource","ngCookies"]);

services.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
});

services.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope', '$timeout',
        function ($http, $cookieStore, $rootScope, $timeout) {
            var service = {};

            service.Login = function (username, password, callback) {

                /* Dummy authentication for testing, uses $timeout to simulate api call
                 ----------------------------------------------*/
                //$timeout(function(){
                //    var response = { success: username === 'test' && password === 'test' };
                //    if(!response.success) {
                //        response.message = 'Username or password is incorrect';
                //    }
                //    callback(response);
                //}, 1000);

                /* Use this for real authentication
                 ----------------------------------------------*/
                //$http.post('http://192.168.10.48/myroutines/api/login', { username: username, password: password })
                //    .success(function (response) {
                //        callback(response);
                //    });

                var obj = { mail : username, password : password };
                var config = {headers:  {
                    "Credentials" : obj
                    }
                };

                //$http.get('http://192.168.10.48/myroutines/api/login', config)
                //    .success(function (response) {
                //        callback(response);
                //    });
                $http({
                    url: 'http://localhost/myroutines/api/login',
                    method: "GET",
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Basic bashe64username:password',
                        'Credentials': JSON.stringify(obj)
                    }
                })
                .success(function (response) {
                    //console.log(response);
                    callback(response);
                })
                .error(function (response) {
                    console.log("ERROR");
                    callback(response);
                });
            };

            service.SetCredentials = function (username, password) {
                //var authdata = Base64.encode(username + ':' + password);
                var authdata = username + ':' + password;

                $rootScope.globals = {
                    currentUser: {
                        username: username,
                        authdata: authdata
                    }
                };

                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
            };

            service.ClearCredentials = function () {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = 'Basic ';
            };

            return service;
        }])

//Work in progress
services.factory('UserService',
    ['$http',
        function ($http) {
            var service = {};

            service.Create = Create;

            return service;

            function Create(user) {

                return $http.post('http://localhost/myroutines/api/user', user).then(handleSuccess, handleError('Error creating user'));
            }

            // private functions
            function handleSuccess(data) {
                return data;
            }

            function handleError(error) {
                return function () {
                    return { success: false, message: error };
                };
            }
        }
    ]
);