progressPicturesApp.config(['$routeProvider', function ($routeProvider) {
    // Build URLs.
    $routeProvider

        // Album listing
        .when('/albums/', {
            templateUrl: '/static/partials/images/album_list.html',
            controller: 'AlbumListingCtrl',
            resolve: {
                album: [function () {
                    return {};
                }]
            }
        })

        // Album detail
        .when('/album/:pk/', {
            templateUrl: '/static/partials/images/album_detail.html',
            controller: 'AlbumDetailCtrl',
            controllerAs: 'albumdetail'
        })

        // Image detail
        .when('/image/:image_pk/', {
            templateUrl: '/static/partials/images/image_detail.html',
            controller: 'ImageDetailCtrl'
        });
}]);
