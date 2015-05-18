var controllers = angular.module('controllers',[]);

controllers.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($scope, $rootScope, $location, AuthenticationService) {
            // reset login status
            AuthenticationService.ClearCredentials();

            $scope.checkFormAndSubmit = function(isValid) {
                if (isValid) {
                    login();
                }
            };

            function login() {
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

            $scope.checkFormAndSubmit = function(isValid) {
                console.log("Form validity:" + isValid);
                if (isValid) {
                    register();
                }
            };

            $scope.loginPage = function() {
                $location.path('/login');
            };

            function register() {
                $scope.dataLoading = true;
                UserService.Create($scope.user, function(response) {
                    if(response.status === "success") {
                        console.log("Created new user");
                        $location.path('/login');
                    } else {
                        if(response.data.mail === false) {
                            $scope.error = "Mail is already in use.";
                        }
                        //$scope.error = response.data;
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