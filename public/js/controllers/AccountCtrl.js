angular.module('AccountCtrl', []).controller('AccountController', function ($scope, $http, $location, $rootScope, $routeParams, $state) {

    $scope.edit = true;
    $rootScope.loggedIn = false;
    $scope.user = {};
    $state.transitionTo('account.details');


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
            name: $scope.user.name,
            surname: $scope.user.surname,
            email: $scope.user.email,
            emailPassword: $scope.user.emailPassword

        }).success(function () {
            $scope.editEnable();
        });

    };
    $scope.createList = function () {
        $http.post('/api/createList', {
            username: $scope.user.username,
            name: $scope.user.lists.name,
        }).success(function () {
            $http.get('/loggedin').success(function (data) {
                $scope.user = data;

            });
        });
    };
    $scope.AddAddressToList = function (object_id, contactFirstName, contactLastName, contactEmail) {
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
    };
    $scope.DeleteList = function (id, object_id) { //object_id - id w bazie , id - na scope
        $scope.user.lists.splice(id, 1);
        $http.post('/api/deleteList', {
            id: object_id,
            username: $scope.user.username
        });
    };
    $scope.DeleteContactFromList = function (index) {
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
    };
    $scope.ListDetails = function (index) {
        $scope.chosenList = $scope.user.lists[index];
        $rootScope.ListIndex = index;
    };
    $scope.EditContactData = function (id, firstName, lastName, email) {
        // alert(id + " " + firstName + " " + lastName + " " + email);
        $http.post('/api/editContactData', {
            username: $scope.user.username,
            listId: $rootScope.ListIndex,
            contactId: id,
            firstName: firstName,
            lastName: lastName,
            email: email
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
    $scope.DeleteEmail = function (index) {
        console.log("id emaila " + index);
        $scope.user.emailLayouts.splice(index, 1);
        $http.post('/api/deleteEmail', {
            username: $scope.user.username,
            id: index
        });
    };
    $scope.CreateEmail = function (newMailName, newMailBody) {
        console.log(newMailName + "" + newMailBody);
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
    };
    $scope.SelectEmailToEdit = function (index) {

        $scope.chosenEmail = $scope.user.emailLayouts[index];
        $scope.chosenEmail.id = index;
        console.log($scope.chosenEmail.id);
    };
    $scope.UpdateEmail = function (name, updateMailBody) {
        console.log(name + updateMailBody);
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
    };


});