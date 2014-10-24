progressPicturesApp.config(['$routeProvider', function ($routeProvider) {
    // Build URLs.
    $routeProvider

        // Album listing
        .when('/auth/', {
            templateUrl: '/static/partials/auth/landing.html',
            controller: 'AuthCtrl'
        });
}]);
