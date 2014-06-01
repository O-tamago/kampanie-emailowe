angular.module('RegisterCtrl', []).controller('RegisterController', ['$scope', '$http', '$location', '$rootScope', '$modalInstance',
    function ($scope, $http, $location, $rootScope, $modalInstance) {
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
                    $modalInstance.dismiss('cancel');

                });

            });
        };
        $scope.closeModal = function () {
            $modalInstance.dismiss('cancel');
        }
}]);