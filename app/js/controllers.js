
var controllers = angular.module('controllers',[]);

controllers.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($scope, $rootScope, $location, AuthenticationService) {
            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.login = function () {
                $scope.dataLoading = true;
                AuthenticationService.Login($scope.username, $scope.password, function(response) {
                    if(response.status === "success") {
                        console.log("Login successful");
                        AuthenticationService.SetCredentials($scope.username, $scope.password);
                        $location.path('/');
                    } else {
                        console.log("Login failed!");
                        $scope.error = response.data;
                        $scope.dataLoading = false;
                    }
                });
            };
        }
    ]);

controllers.controller('RegisterController',
    ['$scope', '$rootScope', '$location', 'UserService',
        function ($scope, $rootScope, $location, UserService) {
            $scope.loginPage = function() {
                $location.path('/login');
            }

            $scope.register = function () {
                console.log($scope.user);
                $scope.dataLoading = true;
                UserService.Create($scope.user, function(response) {
                    if(response.status === "success") {
                        console.log("Created new user");
                        $location.path('/login');
                    } else {
                        console.log($scope.error);
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };
        }
    ]);

controllers.controller('HomeController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($scope, $rootScope, $location, AuthenticationService) {

            $scope.logout = function () {
                console.log("Logout successful");
                AuthenticationService.ClearCredentials();
                $location.path('/login');
            };
        }
    ]);