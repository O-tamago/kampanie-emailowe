angular.module('AccountCtrl', []).controller('AccountController', function ($scope, $http, $location, $rootScope) {
    $scope.tagline = "account page";
    $scope.edit = true;
    $rootScope.loggedIn = false;
    $scope.user = {};
    $http.get('/loggedin').success(function (data) {
        $scope.user = data;
        if (data !== '0')
            $rootScope.loggedIn = true;
    });

    $scope.sendMail = function () {
        $http.post("/api/sendmail").error(function (data) {
            $scope.res = "blad podczas wyslania";
        }).success(function (data) {
            $scope.res = "wyslano maila";
        });

    };
    $scope.UpdateData = function () {

        $http.post('/api/UpdateUserData', {
            username: $scope.user.username,
            password: $scope.user.password,
            name: $scope.user.name,
            surname: $scope.user.surname,
            email: $scope.user.email

        });

    };
    $scope.editEnable = function () {
        if ($scope.edit == true) {
            $scope.edit = false;
            return $scope.edit;
        } else if ($scope.edit == false) {
            $scope.edit = true;
            return $scope.edit;
        }
    };

});