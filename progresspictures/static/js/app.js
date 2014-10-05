// Define the base application.
// Dependancies:
//  - ngCookies: Used to get the CSRF cookie.

var progressPicturesApp = angular.module('progressPicturesApp', ['ngCookies', 'ngRoute', 'angularFileUpload']);

progressPicturesApp.filter('fromNow', function() {
    return function(date) {
        return moment(date).fromNow();
    }
});

progressPicturesApp.config(['$httpProvider', '$routeProvider', '$locationProvider', function($httpProvider, $routeProvider, $locationProvider) {
    // Send the CSRF token with POST requests.
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';

    $locationProvider.html5Mode(true);

    // Build URLs.
    $routeProvider
    .when('/', {
        templateUrl: '/static/templates/images/album_list.html',
        controller: 'AlbumListingCtrl'
    })

    .when('/album/:pk/', {
        templateUrl: '/static/templates/images/album_detail.html',
        controller: 'AlbumDetailCtrl'
    })

    .when('/album/:album_pk/image/:image_pk', {
        templateUrl: '/static/templates/images/image_detail.html',
        controller: 'ImageDetailCtrl'
    });
}]);


progressPicturesApp.controller('AlbumListingCtrl', ['$scope', '$http', function($scope, $http) {
    console.log('AlbumListingCtrl');
    $scope.viewClass = 'album-listing';

    $scope.loadAlbums = function() {
        $http.get('/api/album/').then(function (response) {
            console.log(response);
            $scope.albums = response.data;
        });
    };

    $scope.createAlbum = function() {
        $http.post('/api/album/', {
            'title': this.AlbumTitle,
        }).then(function(response) {
            $scope.loadAlbums();
        });
    }

    $scope.loadAlbums();
}]);

progressPicturesApp.controller('AlbumDetailCtrl', ['$scope', '$http', '$routeParams', '$upload', function($scope, $http, $routeParams, $upload) {
    console.log('AlbumDetailCtrl');
    $scope.viewClass = 'album-detail';

    $scope.loadImages = function() {
        $http.get('/api/album/' + $routeParams.pk + '/').then(function (response) {
            console.log(response);
            $scope.album = response.data;
        });
    }

    $scope.onFileSelect = function($files) {
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];

            $scope.upload = $upload.upload({
                url: '/api/image/',
                method: 'POST',
                data: {
                    title: $scope.ImageTitle,
                    album: $routeParams.pk,
                },
                file: file,
            }).success(function(data, status, headers, config) {
                $scope.loadImages();

                angular.forEach(
                    document.querySelectorAll('input'),
                    function(inputElem) {
                        angular.element(inputElem).val(null);
                    }
                );
            });
        }
    };

    $scope.loadImages();
}]);


progressPicturesApp.controller('ImageDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    console.log('ImageDetailCtrl');
    $scope.viewClass = 'image-detail';

    $http.get('/api/image/' + $routeParams.image_pk + '/').then(function (response) {
        console.log(response);
        $scope.album = response.data;
    });
}]);

// progressPicturesApp.controller('categoryListing', function($scope, $http, $cookies) {
//     $scope.loadCategories = function() {
//         $http.get('/api/category/').then( function (response) {
//             console.debug(response);
//             $scope.categories = response.data;
//         });
//     }

//     $scope.createCategory = function() {
//         $http.post('/api/category/', {
//             'name': this.newCategoryName,
//         }).then(function(response) {
//             $scope.loadCategories();
//         });
//     }

//     // Initialise values on elements.
//     $scope.newCategoryName = 'New category'

//     $scope.loadCategories();
// });

// progressPicturesApp.controller('categoryDetail', function($scope) {
//     $scope.pageClass = 'index';
// });
