angular.module('RegisterCtrl', []).controller('RegisterController', function ($scope, $http, $location, $rootScope) {
    $scope.tagline = "Registration page";
    $scope.user = {};
    $scope.register = function () {
        $http.post('/registration', {
            username: $scope.user.username,
            password: $scope.user.password
        }).success(function (user) {
            $http.post('/login', {
                username: $scope.user.username,
                password: $scope.user.password

            }).success(function () {
                $location.url('/account');
            });

        });
    };
});