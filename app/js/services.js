
var services = angular.module('services',["ngResource","ngCookies"]);

services.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
});

services.factory('AuthenticationService',
    ['$http', '$cookieStore', '$rootScope',
        function ($http, $cookieStore, $rootScope) {
            var service = {};
            //var ip = "192.168.10.41";
            var ip = "localhost";

            service.Login = function (username, password, callback) {

                var obj = { mail : username, password : password };

                $http({
                    url: 'http://' + ip + '/myroutines/api/login',
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

services.factory('UserService',
    ['$http',
        function ($http) {
            var service = {};

            service.Create = Create;

            //var ip = "192.168.10.41";
            var ip = "localhost";

            return service;

            function Create(user, callback) {
                $http({
                    url: 'http://' + ip + '/myroutines/api/user',
                    method: "POST",
                    data: user,
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': 'Basic bashe64username:password'
                    }})
                    .success(function (response) {
                        console.log(response);
                        callback(response);
                    })
                    .error(function (response) {
                        console.log("ERROR");
                        callback(response);
                    });
            }
        }
    ]
);

services.factory('UserProperties', function() {
    var registeredUser = {
        mail: null,
        active: false
    };

    return {
        setRegisteredUser: function(value, status) {
            registeredUser.mail = value;
            registeredUser.active = status;
        },
        getRegisteredUser: function() {
            return registeredUser;
        },
        getRegisteredUserMail: function() {
            return registeredUser.mail;
        },
        setRegisteredUserMail: function(value) {
            registeredUser.mail = value;
        },
        getRegisteredUserStatus: function() {
            return registeredUser.active;
        },
        setRegisteredUserStatus: function(value) {
            registeredUser.active = value;
        },
        clearRegisteredUser: function() {
            registeredUser.mail = null;
            registeredUser.active = false;
        }
    }
});