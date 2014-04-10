angular.module("LoginCtrl", []).controller("LoginController", function ($scope, $rootScope, $http, $location) {
    $scope.tagline = "Zaloguj sie";
    $scope.user = {};
    $scope.login = function () {
        $http.post("/login", {
            username: $scope.user.username,
            password: $scope.user.password
        }).success(function (user) {
            $rootScope.message = "Auth succesful";
            $location.url('/users');
        }).error(function () {
            $rootScope.message = "Auth fail";
            $location.url("/login");
        });
    }
});