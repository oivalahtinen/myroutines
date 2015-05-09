
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
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };
        }
    ]);

controllers.controller('RegisterController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($scope, $rootScope, $location, AuthenticationService) {

            $scope.loginPage = function() {
                $location.path('/login');
            }
            // reset login status
            //AuthenticationService.ClearCredentials();
            //
            //$scope.login = function () {
            //    $scope.dataLoading = true;
            //    AuthenticationService.Login($scope.username, $scope.password, function(response) {
            //        if(response.status === "success") {
            //            AuthenticationService.SetCredentials($scope.username, $scope.password);
            //            $location.path('/');
            //        } else {
            //            $scope.error = response.message;
            //            $scope.dataLoading = false;
            //        }
            //    });
            //};
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