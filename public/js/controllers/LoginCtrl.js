angular.module("LoginCtrl", []).controller("LoginController", ['$scope', '$rootScope', '$http', '$location',
        function ($scope, $rootScope, $http, $location) {
        $scope.tagline = "Login page";
        $scope.user = {};
        $scope.login = function () {
            $http.post("/login", {
                username: $scope.user.username,
                password: $scope.user.password
            }).success(function (user) {
                $location.url('/account');

            }).error(function (user) {
                $location.url("/login");
            });
        }
}]);