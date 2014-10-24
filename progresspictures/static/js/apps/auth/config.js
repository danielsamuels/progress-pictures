progressPicturesApp.config(['$routeProvider', function ($routeProvider) {
    // Build URLs.
    $routeProvider

        // Album listing
        .when('/auth/login/', {
            templateUrl: '/static/partials/auth/login.html',
            controller: 'LoginCtrl'
        })

        .when('/auth/register/', {
            templateUrl: '/static/partials/auth/register.html',
            controller: 'RegisterCtrl'
        });
}]);
