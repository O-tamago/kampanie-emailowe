angular.module('AccountCtrl', []).controller('AccountController', ['$scope', '$http', '$location', '$rootScope', '$routeParams', '$state', 'AccountService',
        function ($scope, $http, $location, $rootScope, $routeParams, $state, AccountService) {

        $scope.edit = true;
        $rootScope.loggedIn = false;
        $scope.user = {};
        $state.transitionTo('account.details');
        $rootScope.message = '';

        AccountService.GetUserData($scope, $rootScope);

        $scope.sendMail = function () {
            $http.post("/api/sendmail").error(function (data) {
                $scope.res = "blad podczas wyslania";
            }).success(function (data) {
                $scope.res = "wyslano maila";
            });

        };
        $scope.UpdateData = function () {
            AccountService.UpdateUserData($scope);
        };
        $scope.createList = function () {
            AccountService.CreateList($scope);
        };
        $scope.AddAddressToList = function (object_id, contactFirstName, contactLastName, contactEmail) {
            AccountService.AddAddressToList($scope, $rootScope, contactFirstName, contactLastName, contactEmail);
        };
        $scope.DeleteList = function (id, object_id) { //object_id - id w bazie , id - na scope
            $scope.user.lists.splice(id, 1);
            AccountService.DeleteList($scope, object_id);

        };
        $scope.DeleteContactFromList = function (index) {
            AccountService.DeleteContactFromList($scope, $rootScope, index);

        };
        $scope.ListDetails = function (index) {
            $scope.chosenList = $scope.user.lists[index];
            $rootScope.ListIndex = index;
        };
        $scope.EditContactData = function (id, firstName, lastName, email) {
            // alert(id + " " + firstName + " " + lastName + " " + email);
            AccountService.EditContactData($scope, $rootScope, id, firstName, lastName, email);


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
        $scope.DeleteEmail = function (index) {
            console.log("id emaila " + index);
            AccountService.DeleteEmail($scope, $rootScope, index);
        };
        $scope.CreateEmail = function (newMailName, newMailBody) {
            console.log(newMailName + "" + newMailBody);
            AccountService.CreateEmail($scope, $rootScope, newMailName, newMailBody);
        };
        $scope.SelectEmailToEdit = function (index) {

            $scope.chosenEmail = $scope.user.emailLayouts[index];
            $scope.chosenEmail.id = index;
            console.log($scope.chosenEmail.id);
        };
        $scope.UpdateEmail = function (name, updateMailBody) {
            console.log(name + updateMailBody);
            AccountService.UpdateEmail($scope, name, updateMailBody);
        };
        $scope.logout = function () {
            AccountService.Logout($rootScope);
        };


}]);