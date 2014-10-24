progressPicturesApp.config(['$routeProvider', function ($routeProvider) {
    // Build URLs.
    $routeProvider

        // Album listing
        .when('/', {
            templateUrl: '/static/partials/site/homepage.html',
            controller: 'HomepageCtrl'
        });
}]);
