angular.module('appRoutes', ['ui.router']).config(['$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider',
        function ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {


        //================================================
        // Check if the user is connected
        //================================================
        var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function (user) {
                // Authenticated
                if (user !== '0')
                    $timeout(deferred.resolve, 0);

                // Not Authenticated
                else {
                    $rootScope.message = 'You need to log in.';
                    $timeout(function () {
                        deferred.reject();
                    }, 0);
                    $location.url('/login');
                }
            });
        };
        //================================================
        // Add an interceptor for AJAX errors
        //================================================
        $httpProvider.responseInterceptors.push(function ($q, $location) {
            return function (promise) {
                return promise.then(
                    // Success: just return the response
                    function (response) {
                        return response;
                    },
                    // Error: check the error status to get only the 401
                    function (response) {
                        if (response.status === 401)
                            $location.url('/login');
                        return $q.reject(response);
                    }
                );
            }
        });
        //================================================
        // ROUTES
        //================================================
        $urlRouterProvider.otherwise('/information');
        $stateProvider
            .state('information', {
                url: '/information',
                templateUrl: 'views/information.html',
                controller: 'InformationController'
            })

        .state('account', {
            url: '/account',
            templateUrl: 'views/account.html',
            controller: 'AccountController',
            resolve: {
                loggedin: checkLoggedin,
            }
        })

        .state('account.details', {
            templateUrl: 'views/account-details.html'
        })
            .state('account.lists', {
                templateUrl: 'views/account-lists.html'
            })
            .state('account.listDetails', {
                templateUrl: 'views/list-details.html'
            })
            .state('account.campaigns', {
                templateUrl: 'views/account-campaigns.html'
            })
            .state('account.createCampaign', {
                templateUrl: 'views/campaign-create.html'
            })
            .state('account.statistics', {
                templateUrl: 'views/account-statistics.html'
            })
            .state('account.emails', {
                templateUrl: 'views/account-emails.html'
            })
            .state('account.createEmail', {
                templateUrl: 'views/email-create.html'
            })
            .state('account.editEmail', {
                templateUrl: 'views/email-edit.html'
            })

        $locationProvider.html5Mode(true);

}]);