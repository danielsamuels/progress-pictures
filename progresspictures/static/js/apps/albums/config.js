progressPicturesApp.config(['$routeProvider', function ($routeProvider) {
    // Build URLs.
    $routeProvider

        // Album listing
        .when('/albums/', {
            templateUrl: '/static/partials/images/album_list.html',
            controller: 'AlbumListingCtrl',
            resolve: {
                albums: ['albumFactory', function (albumFactory) {
                    return albumFactory.list();
                }]
            }
        })

        // Album detail
        .when('/album/:pk/', {
            templateUrl: '/static/partials/images/album_detail.html',
            controller: 'AlbumDetailCtrl',
            controllerAs: 'albumdetail',
            resolve: {
                album: ['$route', 'albumFactory', function ($route, albumFactory) {
                    return albumFactory.detail($route.current.params.pk);
                }]
            }
        })

        // Image detail
        .when('/album/:album_pk/image/:image_pk/', {
            templateUrl: '/static/partials/images/image_detail.html',
            controller: 'ImageDetailCtrl',
            controllerAs: 'imagedetail',
            resolve: {
                image: ['$route', 'imageFactory', function ($route, imageFactory) {
                    return imageFactory.detail($route.current.params.image_pk);
                }]
            }
        });
}]);
