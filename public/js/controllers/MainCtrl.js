angular.module('MainCtrl', []).controller('MainController', function ($scope, $http) {

    $scope.tagline = 'Witaj na stronie głównej!';
    $scope.res = "";
    $scope.sendMail = function () {
        $http.post("/api/sendmail").error(function (data) {
            $scope.res = "blad podczas wyslania";

        }).success(function (data) {

            $scope.res = "wyslano maila";

        });


    };

});