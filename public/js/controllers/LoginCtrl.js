angular.module("LoginCtrl", []).controller("LoginController", ['$scope', '$rootScope', '$http', '$location', '$modalInstance',
        function ($scope, $rootScope, $http, $location, $modalInstance) {
        $scope.tagline = "Login page";
        $scope.user = {};
        $scope.login = function () {
            $http.post("/login", {
                username: $scope.user.username,
                password: $scope.user.password
            }).success(function (user) {
                $location.url('/account');
                $modalInstance.dismiss('cancel');

            }).error(function (user) {
                $location.url("/login");
            });
        }
        $scope.closeModal = function () {
            $modalInstance.dismiss('cancel');
        }
}]);