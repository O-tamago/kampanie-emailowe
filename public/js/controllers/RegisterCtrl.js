angular.module('RegisterCtrl', []).controller('RegisterController', function ($scope, $http, $location, $rootScope) {
    $scope.tagline = "Rejestracja";
    $scope.user = {};
    $scope.register = function () {
        $http.post('/rejestracja', {
            username: $scope.user.username,
            password: $scope.user.password
        }).success(function (user) {

            $location.url('/users');

        }).error(function () {
            $location.url('/rejestracja');


        });
    };
});