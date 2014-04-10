angular.module('UsersCtrl', []).controller('UsersController', function ($scope, $http, $location) {
    $scope.tagline = "users page";

    $http.get("/api/listOfUsers").success(function (data) {
        $scope.listOfUsers = data;
    });

    $http.get('/loggedin').success(function (data) {
        $scope.loggedUser = data;
    });

});