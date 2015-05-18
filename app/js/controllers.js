var controllers = angular.module('controllers',[]);

controllers.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', 'UserProperties',
        function ($scope, $rootScope, $location, AuthenticationService, UserProperties) {
            // reset login status
            AuthenticationService.ClearCredentials();

            if(UserProperties.getRegisteredUserStatus() === true) {
                $scope.userRegistrationStatus = UserProperties.getRegisteredUserStatus();
                $scope.userRegistrationMail = UserProperties.getRegisteredUserMail();
            }
            UserProperties.clearRegisteredUser();

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
    ['$scope', '$rootScope', '$location', 'UserService', 'UserProperties',
        function ($scope, $rootScope, $location, UserService, UserProperties) {
            $scope.checkFormAndSubmit = function(isValid) {
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
                        UserProperties.setRegisteredUser($scope.user.mail, true);
                        $location.path('/login');
                        //console.log("Register page:" + UserProperties.getRegisteredUser().toString());
                    } else {
                        if(response.data.mail === false) {
                            $scope.error = "Mail is already in use.";
                        }
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