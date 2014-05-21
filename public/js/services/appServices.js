angular.module('appServices', []).factory('AccountService', ['$http', '$location', '$state',
    function ($http, $location, $state) {
        return {
            GetUserData: function ($scope, $rootScope) {
                $http.get('/loggedin').success(function (data) {
                    $scope.user = data;
                    if (data !== '0')
                        $rootScope.loggedIn = true;

                });
            },
            UpdateUserData: function ($scope) {
                $http.post('/api/UpdateUserData', {
                    username: $scope.user.username,
                    name: $scope.user.name,
                    surname: $scope.user.surname,
                    email: $scope.user.email,
                    emailPassword: $scope.user.emailPassword

                }).success(function () {
                    $scope.editEnable();
                });
            },
            CreateList: function ($scope) {
                $http.post('/api/createList', {
                    username: $scope.user.username,
                    name: $scope.user.lists.name,
                }).success(function () {
                    $http.get('/loggedin').success(function (data) {
                        $scope.user = data;

                    });
                });
            },
            AddAddressToList: function ($scope, $rootScope, contactFirstName, contactLastName, contactEmail) {
                //        console.log(object_id);
                //        console.log(contactEmail);
                // console.log($rootScope.ListIndex);
                $http.post('/api/addContactToList', {
                    username: $scope.user.username,
                    listId: $rootScope.ListIndex,
                    contactFirstName: contactFirstName,
                    contactLastName: contactLastName,
                    contactEmail: contactEmail
                }).success(function () {
                    $http.get('/loggedin').success(function (data) {
                        $scope.user = data;
                        $scope.chosenList = $scope.user.lists[$rootScope.ListIndex];
                    });
                });
            },
            DeleteContactFromList: function ($scope, $rootScope, index) {
                $http.post('/api/deleteContactFromList', {
                    username: $scope.user.username,
                    id: index,
                    listId: $rootScope.ListIndex,
                }).success(function () {
                    $http.get('/loggedin').success(function (data) {
                        $scope.user = data;
                        $scope.chosenList = $scope.user.lists[$rootScope.ListIndex];
                    });
                });
            },
            EditContactData: function ($scope, $rootScope, id, firstName, lastName, email) {
                // alert(id + " " + firstName + " " + lastName + " " + email);
                $http.post('/api/editContactData', {
                    username: $scope.user.username,
                    listId: $rootScope.ListIndex,
                    contactId: id,
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                });
            },
            DeleteList: function ($scope, object_id) {
                $http.post('/api/deleteList', {
                    id: object_id,
                    username: $scope.user.username
                });
            },
            DeleteEmail: function ($scope, index) {
                $http.post('/api/deleteEmail', {
                    username: $scope.user.username,
                    id: index
                });
            },
            CreateEmail: function ($scope, newMailName, newMailBody) {
                $http.post('/api/createNewMail', {
                    username: $scope.user.username,
                    name: newMailName,
                    body: newMailBody
                }).success(function () {
                    $http.get('/loggedin').success(function (data) {
                        $scope.user = data;
                        $scope.chosenList = $scope.user.lists[$rootScope.ListIndex];
                    });
                    $state.transitionTo('account.emails');

                });
            },
            UpdateEmail: function ($scope, name, updateMailBody) {
                $http.post('/api/updateEmailData', {
                    username: $scope.user.username,
                    id: $scope.chosenEmail.id,
                    name: name,
                    body: updateMailBody

                }).success(function () {
                    $http.get('/loggedin').success(function (data) {
                        $scope.user = data;
                        $scope.chosenList = $scope.user.lists[$rootScope.ListIndex];
                    });
                    $state.transitionTo('account.emails');
                });
            },
            Logout: function ($rootScope) {
                $http.post('/logout').success(function () {
                    $location.url('/login');
                    $rootScope.loggedIn = false;
                    $rootScope.message = 'Logged out.';
                });
            }
        }
}]);