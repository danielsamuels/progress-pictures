// Define the base application.
// Dependancies:
//  - ngCookies: Used to get the CSRF cookie.

var progressPicturesApp = angular.module('progressPicturesApp', ['ngCookies', 'ngRoute', 'angularFileUpload', 'ngResource']);

progressPicturesApp.filter('fromNow', function() {
    return function(date) {
        return moment(date).fromNow();
    }
});

progressPicturesApp.factory('api', function($resource){
    function add_auth_header(data, headersGetter){
        // as per HTTP authentication spec [1], credentials must be
        // encoded in base64. Lets use window.btoa [2]
        var headers = headersGetter();
        headers['Authorization'] = data.email + ':' + data.password;
    }
    // defining the endpoints. Note we escape url trailing dashes: Angular
    // strips unescaped trailing slashes. Problem as Django redirects urls
    // not ending in slashes to url that ends in slash for SEO reasons, unless
    // we tell Django not to [3]. This is a problem as the POST data cannot
    // be sent with the redirect. So we want Angular to not strip the slashes!
    return {
        auth: $resource('/api/auth\\/', {}, {
            login: {
                method: 'POST',
                transformRequest: add_auth_header,
            },
            register: {
                method: 'PUT'
            },
            logout: {
                method: 'DELETE'
            }
        }),

        albums: $resource('/api/album\\/', {}, {
            list: {
                method: 'GET',
                isArray: true
            },
            create: {
                method: 'POST'
            }
        }),

        images: $resource('/api/album/:albumID\\/', {}, {
            list: {
                method: 'GET'
            },
        })
    };
});

progressPicturesApp.factory('MenuButton', function(){
    return {
        href: '#',
        text: ''
    };
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


progressPicturesApp.controller('PageCtrl', ['$scope', 'MenuButton', function($scope, MenuButton) {
    console.log('PageCtrl')
    $scope.menu = MenuButton;
}]);


progressPicturesApp.controller('AlbumListingCtrl', ['$scope', '$http', function($scope, $http) {
    console.log('AlbumListingCtrl');
    $scope.menu.text = 'Add album';

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
    $scope.menu.text = 'Upload image';

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
